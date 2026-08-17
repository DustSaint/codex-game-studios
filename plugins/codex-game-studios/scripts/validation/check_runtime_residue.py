#!/usr/bin/env python3
"""Reject legacy runtime identifiers from the Codex Game Studios package.

Migration history belongs in documentation, not in instructions that Codex loads
at runtime. This validator intentionally scans only runtime-facing package paths.
"""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Iterator, Pattern


PLUGIN_ROOT = Path(__file__).resolve().parents[2]


@dataclass(frozen=True)
class ForbiddenIdentifier:
    label: str
    pattern: Pattern[str]


@dataclass(frozen=True)
class Finding:
    path: Path
    line: int
    identifier: str
    excerpt: str


# Keep these expressions local to this file. The validator excludes itself so
# that the definitions cannot make a clean package fail its own audit.
FORBIDDEN_IDENTIFIERS = (
    ForbiddenIdentifier("legacy instruction filename", re.compile(r"\bCLAUDE\.md\b", re.IGNORECASE)),
    ForbiddenIdentifier(
        "legacy configuration path",
        re.compile(r"(?<![A-Za-z0-9_])\.claude(?=$|[/\\\s`'\"\)\]])", re.IGNORECASE),
    ),
    ForbiddenIdentifier("legacy product name", re.compile(r"\bClaude\s+Code\b", re.IGNORECASE)),
    ForbiddenIdentifier("legacy task invocation", re.compile(r"\bTask\(")),
    ForbiddenIdentifier("legacy todo tool", re.compile(r"\bTodoWrite\b", re.IGNORECASE)),
    ForbiddenIdentifier(
        "legacy question tool", re.compile(r"\bAskUserQuestion\b", re.IGNORECASE)
    ),
    ForbiddenIdentifier(
        "legacy skill metadata", re.compile(r"(?<![\w-])allowed-tools(?![\w-])", re.IGNORECASE)
    ),
    ForbiddenIdentifier(
        "model-specific tier",
        re.compile(r"(?<![A-Za-z0-9_])(?:sonnet|opus|haiku)(?![A-Za-z0-9_])", re.IGNORECASE),
    ),
)


def _runtime_roots(plugin_root: Path) -> Iterable[Path]:
    """Yield only package areas that can affect runtime agent behavior."""

    yield plugin_root / ".codex-plugin"
    yield plugin_root / "skills"
    yield plugin_root / "references"
    yield plugin_root / "assets" / "project-guidance"
    yield plugin_root / "AGENTS.md"
    yield plugin_root / "scripts"


def _is_ignored_file(path: Path) -> bool:
    resolved = path.resolve()
    if resolved == Path(__file__).resolve():
        return True
    if "__pycache__" in path.parts:
        return True
    return path.suffix.lower() in {".pyc", ".pyo"}


def iter_runtime_files(plugin_root: Path) -> Iterator[Path]:
    """Yield runtime files in deterministic order without entering history docs."""

    candidates: set[Path] = set()
    for runtime_root in _runtime_roots(plugin_root):
        if runtime_root.is_file():
            candidates.add(runtime_root)
        elif runtime_root.is_dir():
            candidates.update(path for path in runtime_root.rglob("*") if path.is_file())

    for path in sorted(candidates, key=lambda candidate: candidate.as_posix().lower()):
        if not _is_ignored_file(path):
            yield path


def find_runtime_residue(plugin_root: Path) -> list[Finding]:
    """Return every forbidden identifier found in runtime-facing text files."""

    plugin_root = plugin_root.resolve()
    findings: list[Finding] = []
    for path in iter_runtime_files(plugin_root):
        # Runtime source and configuration files must be UTF-8. Let decoding
        # errors fail validation instead of silently skipping opaque content.
        text = path.read_text(encoding="utf-8-sig")
        for line_number, line in enumerate(text.splitlines(), start=1):
            for identifier in FORBIDDEN_IDENTIFIERS:
                if identifier.pattern.search(line):
                    findings.append(
                        Finding(
                            path=path,
                            line=line_number,
                            identifier=identifier.label,
                            excerpt=line.strip(),
                        )
                    )
    return findings


def _display_path(path: Path, plugin_root: Path) -> str:
    try:
        return path.resolve().relative_to(plugin_root.resolve()).as_posix()
    except ValueError:
        return str(path)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Check Codex Game Studios runtime files for legacy identifiers."
    )
    parser.add_argument(
        "plugin_root",
        nargs="?",
        type=Path,
        default=PLUGIN_ROOT,
        help="Plugin root to validate (defaults to the package containing this script).",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    plugin_root = args.plugin_root.resolve()
    if not plugin_root.is_dir():
        parser.error(f"plugin root is not a directory: {plugin_root}")

    findings = find_runtime_residue(plugin_root)
    if not findings:
        print(f"Runtime residue check passed: {plugin_root}")
        return 0

    print(f"Runtime residue check failed with {len(findings)} finding(s):")
    for finding in findings:
        path = _display_path(finding.path, plugin_root)
        print(f"{path}:{finding.line}: [{finding.identifier}] {finding.excerpt}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
