from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import unittest
from pathlib import Path


PLUGIN_ROOT = Path(__file__).resolve().parents[1]
FIXTURES = Path(__file__).resolve().parent / "fixtures"
DETECTOR_PATH = PLUGIN_ROOT / "scripts" / "detect_game_project.py"

SPEC = importlib.util.spec_from_file_location("detect_game_project", DETECTOR_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Could not load detector module from {DETECTOR_PATH}")
DETECTOR = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = DETECTOR
SPEC.loader.exec_module(DETECTOR)


class EngineDetectionTests(unittest.TestCase):
    def detect(self, fixture_name: str, max_depth: int = 3) -> dict:
        return DETECTOR.detect_game_projects(FIXTURES / fixture_name, max_depth=max_depth)

    def test_unity_fixture_reports_combined_high_confidence_evidence(self) -> None:
        result = self.detect("unity")

        self.assertEqual("unity", result["primary"]["engine"])
        self.assertEqual("high", result["primary"]["confidence"])
        self.assertEqual(100, result["primary"]["score"])
        self.assertEqual(".", result["primary"]["project_root"])
        markers = {item["marker"] for item in result["primary"]["evidence"]}
        self.assertEqual(
            {
                "unity-assets-directory",
                "unity-packages-manifest",
                "unity-project-version",
            },
            markers,
        )

    def test_unreal_fixture_reports_project_and_supporting_directories(self) -> None:
        result = self.detect("unreal")

        self.assertEqual("unreal", result["primary"]["engine"])
        self.assertEqual("high", result["primary"]["confidence"])
        self.assertEqual(100, result["primary"]["score"])
        markers = {item["marker"] for item in result["primary"]["evidence"]}
        self.assertIn("unreal-project-file", markers)
        self.assertIn("unreal-config-directory", markers)
        self.assertIn("unreal-source-directory", markers)

    def test_godot_fixture_reports_project_file(self) -> None:
        result = self.detect("godot")

        self.assertEqual("godot", result["primary"]["engine"])
        self.assertEqual("high", result["primary"]["confidence"])
        self.assertEqual(["project.godot"], [item["path"] for item in result["primary"]["evidence"]])

    def test_browser_fixture_parses_supported_dependency_sections(self) -> None:
        result = self.detect("browser")

        self.assertEqual("browser", result["primary"]["engine"])
        self.assertEqual("high", result["primary"]["confidence"])
        self.assertEqual(
            ["Phaser", "React Three Fiber", "Three.js"],
            result["primary"]["frameworks"],
        )
        details = {item["detail"] for item in result["primary"]["evidence"]}
        self.assertEqual(
            {
                "dependencies.phaser",
                "dependencies.three",
                "devDependencies.@react-three/fiber",
            },
            details,
        )

    def test_unknown_fixture_has_explicit_unknown_primary(self) -> None:
        result = self.detect("unknown")

        self.assertEqual([], result["detections"])
        self.assertEqual("unknown", result["primary"]["engine"])
        self.assertEqual("none", result["primary"]["confidence"])
        self.assertFalse(result["mixed"])
        self.assertFalse(result["monorepo"])

    def test_mixed_monorepo_preserves_each_project_and_selects_strongest(self) -> None:
        result = DETECTOR.detect_game_projects(FIXTURES)

        self.assertTrue(result["mixed"])
        self.assertTrue(result["monorepo"])
        self.assertEqual("unity", result["primary"]["engine"])
        projects = {(item["engine"], item["project_root"]) for item in result["detections"]}
        self.assertIn(("unity", "unity"), projects)
        self.assertIn(("browser", "browser"), projects)
        self.assertIn(("unreal", "unreal"), projects)
        self.assertIn(("godot", "godot"), projects)

    def test_depth_limit_and_ignored_directories_are_enforced(self) -> None:
        root = FIXTURES / "unknown"
        default_result = DETECTOR.detect_game_projects(root)
        deeper_result = DETECTOR.detect_game_projects(root, max_depth=4)

        self.assertEqual("unknown", default_result["primary"]["engine"])
        self.assertEqual("godot", deeper_result["primary"]["engine"])
        evidence_paths = {
            item["path"]
            for detection in deeper_result["detections"]
            for item in detection["evidence"]
        }
        self.assertNotIn("Library/project.godot", evidence_paths)

    def test_invalid_package_json_is_reported_instead_of_silently_ignored(self) -> None:
        result = DETECTOR.detect_game_projects(FIXTURES / "unknown")

        self.assertEqual("unknown", result["primary"]["engine"])
        self.assertEqual("invalid-package-json", result["warnings"][0]["code"])

    def test_command_line_emits_machine_readable_json(self) -> None:
        completed = subprocess.run(
            [sys.executable, str(DETECTOR_PATH), str(FIXTURES / "browser")],
            check=False,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )

        self.assertEqual(0, completed.returncode, completed.stderr)
        result = json.loads(completed.stdout)
        self.assertEqual("browser", result["primary"]["engine"])


if __name__ == "__main__":
    unittest.main()
