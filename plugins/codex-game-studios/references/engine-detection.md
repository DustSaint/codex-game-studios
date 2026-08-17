# Engine detection and routing

Run `python ../../scripts/detect_game_project.py <project-root>` from a skill
directory, or invoke the script by its absolute plugin path. Treat its JSON as
evidence, not authority: confirm ambiguous or mixed workspaces against project
files before choosing an adapter.

## Markers

- **Unity:** `ProjectSettings/ProjectVersion.txt`, `Packages/manifest.json`, or
  an `Assets/` directory.
- **Unreal:** a `.uproject` file, usually with `Source/`, `Config/`, `Content/`,
  or `Plugins/`.
- **Godot:** `project.godot`, usually with `.tscn`, `.tres`, `.gd`, or addons.
- **Browser game:** `package.json` with Phaser, Three.js, React Three Fiber, or
  related game/runtime dependencies.

For monorepos, work from the smallest directory containing a coherent marker
set. If multiple engines are intentional, state which subproject the current
workflow targets.

## Loading rule

- Concept and game-system design do not load an engine adapter.
- Technical design, implementation, code review, and engine-specific QA load
  exactly one adapter after detection.
- If no engine is confirmed, keep recommendations interface-level and ask only
  when the engine choice would materially change the result.
- Verify version-sensitive APIs against current official documentation for the
  exact project version. Do not assume the newest version or silently upgrade.

## Browser handoff

When the project is a browser game, route architecture and implementation to
the installed `$game-studio` router and its framework-specific skills. Route
live browser execution to `$game-playtest`. This plugin may still handle
engine-neutral concept, design, QA planning, production, and analysis of
existing observations.
