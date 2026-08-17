---
name: write-game-technical-design
description: "Create an implementation-ready technical design or ADR for a game system or feature. Use for architecture, ownership, data flow, integration boundaries, persistence, performance, or engine feasibility; do not use for a purely creative GDD or for writing production code."
---

# Write Game Technical Design

Turn approved game behavior into a technically coherent plan without letting engine APIs redefine the design. Produce decisions an implementer can trace, challenge, test, and maintain.

## Establish the Design Boundary

1. Read the feature brief, game-design sources, repository guidance, existing architecture, and relevant decisions before proposing a structure.
2. State the player-visible behavior, technical goals, non-goals, constraints, dependencies, and acceptance criteria. Distinguish repository evidence from assumptions.
3. Resolve uncertainty that would materially change ownership, persistence, networking, or scope with the user. Do not invent product requirements.
4. Keep the domain model engine-neutral. Introduce engine concepts only at the integration boundary.

Use [technical-design.md](../../assets/templates/technical-design.md) for a new design and [adr.md](../../assets/templates/adr.md) for a durable decision. Adapt the templates to the project rather than adding empty sections.

## Detect the Runtime Context

Follow [engine-detection.md](../../references/engine-detection.md) and inspect actual project markers. When useful, run `../../scripts/detect_game_project.py` from the plugin root and confirm its evidence against the repository.

After detection, load exactly one matching adapter:

- Unity: [unity-workflow.md](../../references/unity-workflow.md)
- Unreal Engine: [unreal-workflow.md](../../references/unreal-workflow.md)
- Godot: [godot-workflow.md](../../references/godot-workflow.md)

If markers conflict or no engine can be established, remain engine-neutral and identify the missing fact instead of guessing. For a browser game, route engine-specific planning to the installed `$game-studio` family and do not load a local engine adapter.

Treat versions and APIs as repository-derived facts. Verify unstable engine details in the official documentation for the detected version.

When the change touches data schemas, gameplay or AI, networking, UI, rendering,
prototypes, or test infrastructure, load only the matching section of
[specialized-runtime-checks.md](../../references/specialized-runtime-checks.md).
Derive constraints from the target project instead of inheriting fixed budgets
or conventions from an unrelated game.

## Design the System

Describe the smallest architecture that satisfies the behavior and fits existing boundaries:

- responsibility and ownership of state;
- lifecycle, initialization order, and teardown;
- component boundaries and allowed dependency directions;
- data flow, commands, events, and public contracts;
- authoring data, runtime data, persistence, migration, and compatibility;
- failure behavior, observability, and recovery;
- frame-time, memory, loading, determinism, and networking constraints where relevant;
- test seams and the automated or manual evidence needed for each risk;
- rollout, content migration, and rollback when existing data or assets change.

Prefer existing abstractions that already own the responsibility. Do not duplicate logic, retain obsolete paths, or hide an architectural conflict behind an adapter or condition.

For a consequential choice, record context, considered alternatives, the decision, consequences, risks, validation, and supersession conditions in an ADR. Explain why rejected alternatives fail the actual constraints.

## Validate the Handoff

Before finishing:

1. Trace every acceptance criterion to a component, data path, and verification method.
2. Walk through normal flow, cancellation or interruption, invalid input, reload, and the highest-risk engine lifecycle transition.
3. Check that state has one clear owner and cleanup has one clear authority.
4. Identify unresolved questions, decisions that require a prototype, and assumptions that could invalidate the design.
5. Separate required implementation from optional follow-up work.

Return the proposed document location, major decisions, rejected alternatives, risks, validation plan, and open questions. Do not modify production code while using this skill unless the user separately asks for implementation.
