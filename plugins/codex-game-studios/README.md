# Codex Game Studios

Codex Game Studios is a Codex-native game-development framework. It covers
concept discovery, system and feature design, technical design, implementation,
review, QA planning, playtest analysis, and production planning while keeping
each entry point small and explicit.

The framework is engine-agnostic during design. It detects Unity, Unreal,
Godot, or browser projects before technical work and loads only the relevant
adapter. Browser implementation and execution reuse the official Codex Game
Studio plugin when it is installed.

## Install and use

```powershell
codex plugin marketplace add DustSaint/codex-game-studios --ref main
codex plugin add codex-game-studios@codex-game-studios
```

Start a new Codex task, then call the coordinator with
`$codex-game-studios:manage-game-development` or invoke one of the focused skills
directly. Natural-language requests can also trigger a matching skill.

## Safety and scope

- Installation does not edit game projects.
- The plugin installs no lifecycle or shell hooks.
- Optional project guidance is copied only when the user requests it.
- External actions such as commit, push, deployment, store upload, and release
  require explicit user authorization.
- Unverified work is reported as unverified, never as passed.

## Provenance

This package is a behavior-first, Codex-native adaptation of
[`donchitos/claude-code-game-studios`](https://github.com/donchitos/claude-code-game-studios)
at commit `984023ddac0d5e27624f2baacde6105e45de375f`. It removes the source runtime's
static role hierarchy, model tiers, command handoffs, and automatic hooks while
retaining its useful game-development lifecycle and evidence discipline.

See `docs/CODEX_MIGRATION_PLAN.md` for the complete 73-skill mapping and
`docs/CODEX_PORT_REPORT.md` for validation results.
