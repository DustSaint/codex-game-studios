#!/usr/bin/env python3
"""Run repeatable checks after reviewing and trusting this plugin's source.

This command imports bundled test modules and optionally executes validator
scripts selected by the caller. It is a test runner, not a safe scanner for an
untrusted package.
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path


def run(command: list[str], cwd: Path) -> bool:
    print(f"RUN: {' '.join(command)}", flush=True)
    environment = os.environ.copy()
    # Validation must not add opaque bytecode to a package that may later be
    # distributed or security-reviewed from source.
    environment["PYTHONDONTWRITEBYTECODE"] = "1"
    completed = subprocess.run(command, cwd=cwd, check=False, env=environment)
    return completed.returncode == 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "root",
        nargs="?",
        type=Path,
        default=Path(__file__).resolve().parents[2],
        help="Plugin root (defaults to the package containing this script)",
    )
    parser.add_argument(
        "--plugin-validator",
        type=Path,
        help="Optional path to plugin-creator validate_plugin.py",
    )
    parser.add_argument(
        "--skill-validator",
        type=Path,
        help="Optional path to skill-creator quick_validate.py",
    )
    args = parser.parse_args()

    root = args.root.resolve(strict=True)
    checks = [
        [
            sys.executable,
            str(root / "scripts" / "validation" / "check_runtime_residue.py"),
            str(root),
        ],
        [
            sys.executable,
            str(root / "scripts" / "validation" / "check_resource_links.py"),
            str(root),
        ],
        [
            sys.executable,
            str(root / "scripts" / "validation" / "validate_evals.py"),
            str(root),
        ],
        [
            sys.executable,
            "-m",
            "unittest",
            "discover",
            "-s",
            str(root / "tests"),
            "-p",
            "test_*.py",
        ],
    ]

    if args.plugin_validator:
        checks.append(
            [sys.executable, str(args.plugin_validator.resolve(strict=True)), str(root)]
        )

    if args.skill_validator:
        validator = str(args.skill_validator.resolve(strict=True))
        for skill in sorted((root / "skills").iterdir()):
            if skill.is_dir():
                checks.append([sys.executable, validator, str(skill)])

    failures = 0
    for command in checks:
        if not run(command, root):
            failures += 1

    if failures:
        print(f"FAIL: {failures} package check group(s) failed")
        return 1

    print(f"PASS: {len(checks)} package check groups")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
