#!/usr/bin/env python3
"""Detect game-engine projects without modifying the inspected workspace.

The detector intentionally reports evidence instead of treating a directory name
as proof.  Consumers can therefore distinguish a strong project signature from a
low-confidence hint and can handle monorepos without guessing one global engine.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable


IGNORED_DIRECTORIES = {
    ".git",
    ".godot",
    "binaries",
    "intermediate",
    "library",
    "node_modules",
    "obj",
    "saved",
    "temp",
}

BROWSER_FRAMEWORKS = {
    "phaser": ("Phaser", 90),
    "@react-three/fiber": ("React Three Fiber", 85),
    "three": ("Three.js", 75),
}

CONFIDENCE_RANK = {"none": 0, "low": 1, "medium": 2, "high": 3}


@dataclass
class Evidence:
    path: str
    marker: str
    weight: int
    detail: str | None = None

    def as_dict(self) -> dict[str, Any]:
        result: dict[str, Any] = {
            "path": self.path,
            "marker": self.marker,
            "weight": self.weight,
        }
        if self.detail is not None:
            result["detail"] = self.detail
        return result


@dataclass
class Candidate:
    engine: str
    project_root: Path
    evidence: list[Evidence] = field(default_factory=list)
    frameworks: set[str] = field(default_factory=set)

    def add_evidence(self, evidence: Evidence) -> None:
        # A marker is recorded once so repeated directory observations cannot
        # inflate confidence as os.walk visits adjacent paths.
        identity = (evidence.path, evidence.marker, evidence.detail)
        existing = {
            (item.path, item.marker, item.detail) for item in self.evidence
        }
        if identity not in existing:
            self.evidence.append(evidence)

    @property
    def score(self) -> int:
        if not self.evidence:
            return 0
        if self.engine == "browser":
            # Multiple rendering/game packages in one package.json do not make
            # it more certainly a game than the strongest individual signal.
            return max(item.weight for item in self.evidence)
        return min(100, sum(item.weight for item in self.evidence))


def _confidence(score: int) -> str:
    if score >= 75:
        return "high"
    if score >= 50:
        return "medium"
    if score > 0:
        return "low"
    return "none"


def _relative_posix(path: Path, scan_root: Path) -> str:
    relative = path.relative_to(scan_root)
    return "." if not relative.parts else relative.as_posix()


def _directory_depth(path: Path, scan_root: Path) -> int:
    relative = path.relative_to(scan_root)
    return 0 if not relative.parts else len(relative.parts)


def _iter_dependency_sections(package_data: dict[str, Any]) -> Iterable[tuple[str, str]]:
    for section_name in (
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "optionalDependencies",
    ):
        section = package_data.get(section_name)
        if isinstance(section, dict):
            for dependency_name in section:
                if isinstance(dependency_name, str):
                    yield section_name, dependency_name


def detect_game_projects(root: Path | str, max_depth: int = 3) -> dict[str, Any]:
    """Return structured engine detections rooted at *root*.

    Directory depth is measured from the scan root: zero scans root files only,
    while the default of three reaches markers inside project subdirectories in
    common monorepo layouts.
    """

    if max_depth < 0:
        raise ValueError("max_depth must be zero or greater")

    scan_root = Path(root).expanduser().resolve(strict=True)
    if not scan_root.is_dir():
        raise NotADirectoryError(f"scan root is not a directory: {scan_root}")

    candidates: dict[tuple[str, Path], Candidate] = {}
    warnings: list[dict[str, str]] = []

    def candidate(engine: str, project_root: Path) -> Candidate:
        key = (engine, project_root)
        if key not in candidates:
            candidates[key] = Candidate(engine=engine, project_root=project_root)
        return candidates[key]

    def record_walk_error(error: OSError) -> None:
        warnings.append(
            {
                "code": "scan-error",
                "path": str(getattr(error, "filename", scan_root)),
                "message": str(error),
            }
        )

    for current_text, directory_names, file_names in os.walk(
        scan_root, topdown=True, onerror=record_walk_error, followlinks=False
    ):
        current = Path(current_text)
        depth = _directory_depth(current, scan_root)

        # Prune generated and dependency trees before looking at their contents.
        directory_names[:] = sorted(
            name
            for name in directory_names
            if name.casefold() not in IGNORED_DIRECTORIES
        )

        if depth >= max_depth:
            visible_directories: list[str] = []
            directory_names[:] = []
        else:
            visible_directories = list(directory_names)

        directory_lookup = {name.casefold(): name for name in visible_directories}
        if "assets" in directory_lookup:
            assets_name = directory_lookup["assets"]
            candidate("unity", current).add_evidence(
                Evidence(
                    path=_relative_posix(current / assets_name, scan_root),
                    marker="unity-assets-directory",
                    weight=15,
                )
            )

        for file_name in sorted(file_names):
            file_path = current / file_name
            lower_name = file_name.casefold()

            if lower_name == "projectversion.txt" and current.name.casefold() == "projectsettings":
                project_root = current.parent
                candidate("unity", project_root).add_evidence(
                    Evidence(
                        path=_relative_posix(file_path, scan_root),
                        marker="unity-project-version",
                        weight=60,
                    )
                )
                continue

            if lower_name == "manifest.json" and current.name.casefold() == "packages":
                project_root = current.parent
                candidate("unity", project_root).add_evidence(
                    Evidence(
                        path=_relative_posix(file_path, scan_root),
                        marker="unity-packages-manifest",
                        weight=25,
                    )
                )
                continue

            if lower_name.endswith(".uproject"):
                unreal = candidate("unreal", current)
                unreal.add_evidence(
                    Evidence(
                        path=_relative_posix(file_path, scan_root),
                        marker="unreal-project-file",
                        weight=80,
                    )
                )
                for supporting_directory, weight in (("Config", 10), ("Source", 10)):
                    support_path = current / supporting_directory
                    if support_path.is_dir():
                        unreal.add_evidence(
                            Evidence(
                                path=_relative_posix(support_path, scan_root),
                                marker=f"unreal-{supporting_directory.casefold()}-directory",
                                weight=weight,
                            )
                        )
                continue

            if lower_name == "project.godot":
                candidate("godot", current).add_evidence(
                    Evidence(
                        path=_relative_posix(file_path, scan_root),
                        marker="godot-project-file",
                        weight=90,
                    )
                )
                continue

            if lower_name != "package.json":
                continue

            relative_package = _relative_posix(file_path, scan_root)
            try:
                package_data = json.loads(file_path.read_text(encoding="utf-8-sig"))
            except (OSError, UnicodeError, json.JSONDecodeError) as error:
                warnings.append(
                    {
                        "code": "invalid-package-json",
                        "path": relative_package,
                        "message": str(error),
                    }
                )
                continue

            if not isinstance(package_data, dict):
                warnings.append(
                    {
                        "code": "invalid-package-json-shape",
                        "path": relative_package,
                        "message": "package.json must contain a JSON object",
                    }
                )
                continue

            browser: Candidate | None = None
            for section_name, dependency_name in _iter_dependency_sections(package_data):
                normalized_dependency = dependency_name.casefold()
                framework = BROWSER_FRAMEWORKS.get(normalized_dependency)
                if framework is None:
                    continue
                if browser is None:
                    browser = candidate("browser", current)
                display_name, weight = framework
                browser.frameworks.add(display_name)
                browser.add_evidence(
                    Evidence(
                        path=relative_package,
                        marker="browser-game-dependency",
                        weight=weight,
                        detail=f"{section_name}.{dependency_name}",
                    )
                )

    detections: list[dict[str, Any]] = []
    for item in candidates.values():
        score = item.score
        detection: dict[str, Any] = {
            "engine": item.engine,
            "project_root": _relative_posix(item.project_root, scan_root),
            "confidence": _confidence(score),
            "score": score,
            "evidence": [
                evidence.as_dict()
                for evidence in sorted(
                    item.evidence,
                    key=lambda evidence: (evidence.path, evidence.marker, evidence.detail or ""),
                )
            ],
        }
        if item.frameworks:
            detection["frameworks"] = sorted(item.frameworks)
        detections.append(detection)

    # The strongest evidence wins.  A shallower project root breaks score ties,
    # which favors the project the user actually pointed at over a nested sample.
    detections.sort(
        key=lambda item: (
            -item["score"],
            len(Path(item["project_root"]).parts) if item["project_root"] != "." else 0,
            item["project_root"],
            item["engine"],
        )
    )

    if detections:
        primary = dict(detections[0])
    else:
        primary = {
            "engine": "unknown",
            "project_root": ".",
            "confidence": "none",
            "score": 0,
            "evidence": [],
        }

    distinct_engines = {item["engine"] for item in detections}
    distinct_roots = {item["project_root"] for item in detections}
    return {
        "root": str(scan_root),
        "max_depth": max_depth,
        "primary": primary,
        "detections": detections,
        "mixed": len(distinct_engines) > 1,
        "monorepo": len(distinct_roots) > 1,
        "warnings": warnings,
    }


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Detect Unity, Unreal, Godot, and browser-game projects."
    )
    parser.add_argument("root", help="Directory to inspect")
    parser.add_argument(
        "--max-depth",
        type=int,
        default=3,
        help="Maximum directory depth to scan (default: 3)",
    )
    parser.add_argument(
        "--pretty",
        action="store_true",
        help="Indent the JSON output for people instead of compact transport",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    args = _build_parser().parse_args(argv)
    try:
        result = detect_game_projects(args.root, max_depth=args.max_depth)
    except (OSError, ValueError) as error:
        print(
            json.dumps(
                {
                    "error": {
                        "type": type(error).__name__,
                        "message": str(error),
                    }
                },
                ensure_ascii=False,
                sort_keys=True,
            )
        )
        return 2

    print(
        json.dumps(
            result,
            ensure_ascii=False,
            indent=2 if args.pretty else None,
            sort_keys=True,
        )
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
