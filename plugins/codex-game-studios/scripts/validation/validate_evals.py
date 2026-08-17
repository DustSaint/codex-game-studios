#!/usr/bin/env python3
"""Validate the Codex Game Studios routing evaluation matrix."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


EXPECTED_CASE_COUNT = 20
EXPECTED_SKILLS = {
    "analyze-game-playtests",
    "brainstorm-game-concept",
    "design-game",
    "design-game-feature",
    "implement-game-feature",
    "manage-game-development",
    "plan-game-production",
    "plan-game-qa",
    "review-game-code",
    "review-game-design",
    "write-game-technical-design",
}
REQUIRED_ENGINES = {"unity", "godot", "unreal", "browser", "unknown"}
BASE_FIELDS = {"id", "prompt", "expected_skill", "expected_behavior", "must_not"}
OPTIONAL_FIELDS = {"engine", "route"}
ID_PATTERN = re.compile(r"^[a-z][a-z0-9_]*$")


def add_error(errors: list[str], case_id: str, message: str) -> None:
    errors.append(f"{case_id}: {message}")


def is_nonempty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def validate_string_list(
    errors: list[str], case_id: str, field: str, value: Any
) -> None:
    if not isinstance(value, list) or not value:
        add_error(errors, case_id, f"{field} must be a nonempty array")
        return
    if any(not is_nonempty_string(item) for item in value):
        add_error(errors, case_id, f"{field} entries must be nonempty strings")


def load_cases(path: Path, errors: list[str]) -> list[Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        errors.append(f"evaluation file not found: {path}")
        return []
    except json.JSONDecodeError as exc:
        errors.append(f"invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}")
        return []

    if not isinstance(value, list):
        errors.append("evaluation root must be an array")
        return []
    return value


def installed_skills(plugin_root: Path, errors: list[str]) -> set[str]:
    skills_root = plugin_root / "skills"
    if not skills_root.is_dir():
        errors.append(f"skills directory not found: {skills_root}")
        return set()

    names = {
        child.name
        for child in skills_root.iterdir()
        if child.is_dir() and (child / "SKILL.md").is_file()
    }
    if names != EXPECTED_SKILLS:
        missing = sorted(EXPECTED_SKILLS - names)
        extra = sorted(names - EXPECTED_SKILLS)
        if missing:
            errors.append(f"missing skill directories: {', '.join(missing)}")
        if extra:
            errors.append(f"unexpected skill directories: {', '.join(extra)}")
    return names


def validate_cases(cases: list[Any], skills: set[str], errors: list[str]) -> None:
    if len(cases) != EXPECTED_CASE_COUNT:
        errors.append(f"expected {EXPECTED_CASE_COUNT} cases, found {len(cases)}")

    seen_ids: set[str] = set()
    covered_skills: set[str] = set()
    covered_engines: set[str] = set()
    has_no_match = False
    has_browser_handoff = False

    for index, case in enumerate(cases, start=1):
        fallback_id = f"case[{index}]"
        if not isinstance(case, dict):
            add_error(errors, fallback_id, "case must be an object")
            continue

        case_id = case.get("id") if is_nonempty_string(case.get("id")) else fallback_id
        missing_fields = BASE_FIELDS - case.keys()
        unknown_fields = case.keys() - BASE_FIELDS - OPTIONAL_FIELDS
        if missing_fields:
            add_error(errors, case_id, f"missing fields: {', '.join(sorted(missing_fields))}")
        if unknown_fields:
            add_error(errors, case_id, f"unknown fields: {', '.join(sorted(unknown_fields))}")

        raw_id = case.get("id")
        if not is_nonempty_string(raw_id) or not ID_PATTERN.fullmatch(raw_id):
            add_error(errors, case_id, "id must use lower_snake_case")
        elif raw_id in seen_ids:
            add_error(errors, case_id, "id must be unique")
        else:
            seen_ids.add(raw_id)

        if not is_nonempty_string(case.get("prompt")):
            add_error(errors, case_id, "prompt must be a nonempty string")
        validate_string_list(errors, case_id, "expected_behavior", case.get("expected_behavior"))
        validate_string_list(errors, case_id, "must_not", case.get("must_not"))

        skill = case.get("expected_skill")
        if skill is None:
            has_no_match = True
        elif not is_nonempty_string(skill):
            add_error(errors, case_id, "expected_skill must be a skill name or null")
        elif skill not in skills:
            add_error(errors, case_id, f"expected_skill does not exist: {skill}")
        else:
            covered_skills.add(skill)

        engine = case.get("engine")
        if engine is not None:
            if not is_nonempty_string(engine):
                add_error(errors, case_id, "engine must be a nonempty string when present")
            else:
                covered_engines.add(engine)
                if not is_nonempty_string(case.get("route")):
                    add_error(errors, case_id, "route is required when engine is present")

        route = case.get("route")
        if route is not None and not is_nonempty_string(route):
            add_error(errors, case_id, "route must be a nonempty string when present")
        if engine == "browser" and route == "official-game-studio-handoff":
            has_browser_handoff = True

    uncovered = sorted(skills - covered_skills)
    if uncovered:
        errors.append(f"skills without an evaluation case: {', '.join(uncovered)}")

    missing_engines = sorted(REQUIRED_ENGINES - covered_engines)
    if missing_engines:
        errors.append(f"missing engine coverage: {', '.join(missing_engines)}")
    if not has_browser_handoff:
        errors.append("missing browser case with official-game-studio-handoff route")
    if not has_no_match:
        errors.append("missing an explicit no-match boundary case")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "root",
        nargs="?",
        type=Path,
        default=Path(__file__).resolve().parents[2],
        help="Plugin root (defaults to the package containing this script)",
    )
    args = parser.parse_args()

    plugin_root = args.root.resolve()
    eval_path = plugin_root / "tests" / "eval_cases.json"
    errors: list[str] = []

    skills = installed_skills(plugin_root, errors)
    cases = load_cases(eval_path, errors)
    if cases:
        validate_cases(cases, skills, errors)

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"FAIL: {len(errors)} validation error(s)")
        return 1

    engines = ", ".join(sorted(REQUIRED_ENGINES))
    print(
        f"PASS: {len(cases)} eval cases; {len(skills)} skills covered; "
        f"engines: {engines}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
