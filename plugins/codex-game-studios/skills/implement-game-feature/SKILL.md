---
name: implement-game-feature
description: "Implement a bounded game feature in an existing Unity, Unreal Engine, or Godot project and verify the result. Use when the user asks for production code or asset/config integration; do not use for a design-only request, broad prototype exploration, or a read-only review."
---

# Implement Game Feature

Deliver the smallest complete behavior that satisfies the accepted design and fits the repository's existing architecture. Fix root causes; never make a failure disappear by skipping logic, swallowing errors, or weakening tests.

## Route Before Editing

1. Read all applicable repository guidance, the requested behavior, design or technical sources, current implementation, tests, and working-tree state.
2. Follow [engine-detection.md](../../references/engine-detection.md). Confirm detected markers against the repository rather than relying only on folder names.
3. For a browser game, stop this workflow and route to the installed `$game-studio` family. Select `$phaser-2d-game`, `$three-webgl-game`, or `$react-three-fiber-game` when its framework is established; do not recreate their browser pipeline here.
4. For a supported native engine, load exactly one adapter:
   - Unity: [unity-workflow.md](../../references/unity-workflow.md)
   - Unreal Engine: [unreal-workflow.md](../../references/unreal-workflow.md)
   - Godot: [godot-workflow.md](../../references/godot-workflow.md)
5. If engine evidence conflicts, or a missing requirement would materially change the implementation, pause and ask for confirmation.

Use project files to establish the engine version. Verify unstable API or tooling details in official documentation for that version.

## Define the Delivery Slice

Restate the observable behavior, acceptance criteria, affected systems, content or data changes, and explicit non-goals. Identify the authoritative state owner and the existing extension point to reuse.

If no implementation-ready design exists for a cross-cutting or high-risk change, use `$write-game-technical-design` first. Do not smuggle an architectural decision into an incidental code edit.

## Implement Coherently

1. Trace the runtime path from input or trigger through state mutation, presentation, persistence, and cleanup.
2. Reuse existing shared logic and conventions. Avoid parallel abstractions, copied logic, compatibility shims without a migration plan, and obsolete fallback paths.
3. Keep tuning values and content data in the project's established data-driven layer when one exists.
4. Preserve lifecycle correctness: initialization, disable or destruction, scene or level transitions, reload, cancellation, and repeated entry.
5. Make failures visible at the layer that can act on them. Do not catch exceptions merely to continue with invalid state.
6. Add comments only where they help a future agent understand non-obvious intent, ownership, invariants, or a deliberate tradeoff.
7. Keep unrelated issues out of the change. Report them separately.

## Verify the Behavior

Use [qa-evidence.md](../../references/qa-evidence.md) to choose evidence proportional to risk.

- Run the narrowest relevant automated tests first, then broader checks affected by the change.
- Add or update tests for stable logic and regressions. Do not delete, skip, or weaken a failing test to obtain a pass.
- Exercise engine lifecycle and integration paths that unit tests cannot prove.
- Inspect generated assets, serialized data, configuration, and diffs when the feature changes them.
- Record commands, results, and limitations. Never claim editor, device, multiplayer, or play-mode validation that was not run.

When a check fails, diagnose the first causal failure before editing again. Correct the implementation or the valid expectation; do not add a bypass.

## Hand Off

Report:

- the player-visible result and implementation boundary;
- files and data changed;
- architecture or ownership decisions made;
- automated and manual evidence with exact outcomes;
- validation that still requires the editor, target hardware, services, or another person;
- unrelated issues discovered but intentionally left unchanged.

Do not expand the scope beyond the requested feature without confirmation.
