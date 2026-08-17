#!/usr/bin/env python3
"""Validate local runtime resource references made by plugin skills."""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote


PLUGIN_ROOT = Path(__file__).resolve().parents[2]
RESOURCE_AREAS = {"references", "assets", "scripts"}

MARKDOWN_LINK = re.compile(
    r"!?\[[^\]\n]*\]\(\s*(?P<destination><[^>\n]+>|[^)\s]+)(?:\s+[^)]*)?\)"
)
INLINE_CODE = re.compile(r"(?<!`)`(?P<code>[^`\r\n]+)`(?!`)")
CODE_RESOURCE_PATH = re.compile(
    r"(?:\.\.[/\\]){2}(?:references|assets|scripts)"
    r"(?:[/\\][A-Za-z0-9._~%+\-]+)*"
    r"(?:#[A-Za-z0-9._~%+\-]+)?"
    r"(?=$|[\s,;:])"
)
RELEVANT_RESOURCE_PATH = re.compile(
    r"^(?:\.\./){2}(?P<area>references|assets|scripts)(?:/|$)"
)
TODO_PLACEHOLDER = re.compile(r"\bTODO\b", re.IGNORECASE)


@dataclass(frozen=True)
class Issue:
    path: Path
    line: int
    message: str


@dataclass(frozen=True)
class ResourceReference:
    raw_path: str
    offset: int
    source: str


def _line_number(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def _normalize_reference(raw_path: str) -> str:
    path = raw_path.strip()
    if path.startswith("<") and path.endswith(">"):
        path = path[1:-1]
    path = unquote(path).replace("\\", "/")
    return path.split("#", maxsplit=1)[0].split("?", maxsplit=1)[0]


def iter_resource_references(text: str) -> list[ResourceReference]:
    """Extract supported resource paths from Markdown links and inline code."""

    references: list[ResourceReference] = []
    seen: set[tuple[int, str]] = set()

    for match in MARKDOWN_LINK.finditer(text):
        raw_path = match.group("destination")
        key = (match.start("destination"), raw_path)
        if key not in seen:
            seen.add(key)
            references.append(ResourceReference(raw_path, key[0], "Markdown link"))

    for code_match in INLINE_CODE.finditer(text):
        code = code_match.group("code")
        code_offset = code_match.start("code")
        for path_match in CODE_RESOURCE_PATH.finditer(code):
            raw_path = path_match.group(0)
            offset = code_offset + path_match.start()
            key = (offset, raw_path)
            if key not in seen:
                seen.add(key)
                references.append(ResourceReference(raw_path, offset, "inline code"))

    return sorted(references, key=lambda reference: (reference.offset, reference.raw_path))


def _is_within(path: Path, directory: Path) -> bool:
    try:
        path.relative_to(directory)
        return True
    except ValueError:
        return False


def _skill_runtime_files(plugin_root: Path) -> list[Path]:
    skills_root = plugin_root / "skills"
    if not skills_root.is_dir():
        return []
    return sorted(
        (path for path in skills_root.rglob("*") if path.is_file()),
        key=lambda path: path.as_posix().lower(),
    )


def find_resource_link_issues(plugin_root: Path) -> list[Issue]:
    """Return broken links, escaped resource paths, and skill TODO placeholders."""

    plugin_root = plugin_root.resolve()
    issues: list[Issue] = []
    for path in _skill_runtime_files(plugin_root):
        text = path.read_text(encoding="utf-8-sig")

        for match in TODO_PLACEHOLDER.finditer(text):
            issues.append(
                Issue(path, _line_number(text, match.start()), "unresolved TODO placeholder")
            )

        if path.name != "SKILL.md":
            continue

        for reference in iter_resource_references(text):
            normalized = _normalize_reference(reference.raw_path)
            relevant = RELEVANT_RESOURCE_PATH.match(normalized)
            if not relevant:
                continue

            area = relevant.group("area")
            target = (path.parent / Path(normalized)).resolve()
            allowed_root = (plugin_root / area).resolve()
            line = _line_number(text, reference.offset)
            if not _is_within(target, allowed_root):
                issues.append(
                    Issue(
                        path,
                        line,
                        f"{reference.source} escapes {area}/: {reference.raw_path}",
                    )
                )
            elif not target.exists():
                issues.append(
                    Issue(
                        path,
                        line,
                        f"missing {reference.source.lower()} target: {reference.raw_path}",
                    )
                )

    return issues


def _display_path(path: Path, plugin_root: Path) -> str:
    try:
        return path.resolve().relative_to(plugin_root.resolve()).as_posix()
    except ValueError:
        return str(path)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Check skill resource links and unresolved placeholders."
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

    issues = find_resource_link_issues(plugin_root)
    if not issues:
        print(f"Resource link check passed: {plugin_root}")
        return 0

    print(f"Resource link check failed with {len(issues)} issue(s):")
    for issue in issues:
        path = _display_path(issue.path, plugin_root)
        print(f"{path}:{issue.line}: {issue.message}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
