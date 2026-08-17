from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


PLUGIN_ROOT = Path(__file__).resolve().parents[1]
TEST_ROOT = Path(__file__).resolve().parent
RESIDUE_CHECKER = PLUGIN_ROOT / "scripts" / "validation" / "check_runtime_residue.py"
LINK_CHECKER = PLUGIN_ROOT / "scripts" / "validation" / "check_resource_links.py"


class ValidatorTests(unittest.TestCase):
    def run_checker(self, checker: Path, fixture_root: Path) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(checker), str(fixture_root)],
            check=False,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )

    @staticmethod
    def write(root: Path, relative_path: str, content: str) -> None:
        target = root / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")

    def test_runtime_residue_accepts_clean_runtime_fixture(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as temporary_directory:
            root = Path(temporary_directory)
            self.write(root, ".codex-plugin/plugin.json", '{"name":"fixture"}\n')
            self.write(root, "skills/example/SKILL.md", "# Clean runtime instructions\n")

            result = self.run_checker(RESIDUE_CHECKER, root)

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("Runtime residue check passed", result.stdout)

    def test_runtime_residue_reports_every_forbidden_category_with_locations(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as temporary_directory:
            root = Path(temporary_directory)
            self.write(
                root,
                "skills/example/SKILL.md",
                "CLAUDE.md\n.claude/skills\nClaude Code\nTask(\nTodoWrite\n"
                "AskUserQuestion\nallowed-tools\nSONNET\nopus\nHaiku\n",
            )

            result = self.run_checker(RESIDUE_CHECKER, root)

            self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
            self.assertIn("skills/example/SKILL.md:1", result.stdout)
            self.assertIn("skills/example/SKILL.md:10", result.stdout)
            self.assertIn("10 finding(s)", result.stdout)

    def test_resource_links_accept_existing_markdown_and_code_targets(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as temporary_directory:
            root = Path(temporary_directory)
            self.write(root, "references/guide.md", "# Guide\n")
            self.write(root, "assets/templates/brief.md", "# Brief\n")
            self.write(root, "scripts/tool.py", "print('fixture')\n")
            self.write(
                root,
                "skills/example/SKILL.md",
                "Read [the guide](../../references/guide.md#workflow), copy "
                "`../../assets/templates/brief.md`, and run `../../scripts/tool.py`.\n",
            )

            result = self.run_checker(LINK_CHECKER, root)

            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("Resource link check passed", result.stdout)

    def test_resource_links_report_missing_targets_and_todo_placeholders(self) -> None:
        with tempfile.TemporaryDirectory(dir=TEST_ROOT) as temporary_directory:
            root = Path(temporary_directory)
            self.write(
                root,
                "skills/example/SKILL.md",
                "TODO: replace this.\nRead [the guide](../../references/missing.md).\n"
                "Do not follow [an escaped path](../../assets/../outside.md).\n",
            )

            result = self.run_checker(LINK_CHECKER, root)

            self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
            self.assertIn("skills/example/SKILL.md:1: unresolved TODO placeholder", result.stdout)
            self.assertIn("skills/example/SKILL.md:2: missing markdown link target", result.stdout)
            self.assertIn("skills/example/SKILL.md:3: Markdown link escapes assets/", result.stdout)


if __name__ == "__main__":
    unittest.main()
