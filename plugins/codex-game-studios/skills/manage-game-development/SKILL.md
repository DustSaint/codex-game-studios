---
name: manage-game-development
description: Coordinate broad, ambiguous, multi-stage, or browser game-development work by discovering project context and routing to focused skills. Use for kickoff, stage assessment, cross-discipline execution, or browser-specialist handoff; use a focused skill for one bounded deliverable, including a milestone or vertical-slice plan.
---

# Manage Game Development

Turn an open-ended game-development request into the smallest coherent workflow, then carry it through with evidence. Coordinate focused skills instead of reproducing their procedures here.

## Establish the working context

1. Read the user's request, repository guidance, nearby design documents, and current task state. Treat existing artifacts and executable behavior as evidence; label assumptions and conflicts.
2. Identify the requested outcome, current lifecycle stage, constraints, target audience, engine or platform, and definition of done. Ask only about uncertainty that would materially change the result.
3. When a workspace may contain a game project, run the [project detector](../../scripts/detect_game_project.py) using its absolute resolved path:

   ```text
   python <plugin-root>/scripts/detect_game_project.py <project-root> --pretty
   ```

   Use its evidence as a routing aid, not as proof that every subproject uses the same engine. For monorepos, scope work to the detected project root. If evidence is absent or mixed, remain engine-neutral until the target is confirmed. Follow [engine detection](../../references/engine-detection.md) for ambiguity and version handling.
4. Classify the project stage from actual artifacts and outcomes, not folder names alone: concept, game design, feature design, technical design, implementation, review, QA/playtest, or production/release.

## Route to the narrowest capable workflow

- Use `$brainstorm-game-concept` for an undeveloped premise, player fantasy, pillars, core loop, or scope hypothesis.
- Use `$design-game` for a GDD, whole-game loop, system map, or cross-system mechanics and balance.
- Use `$design-game-feature` for one bounded, implementation-ready feature specification.
- Use `$write-game-technical-design` for architecture, ownership, interfaces, data flow, constraints, or decisions.
- Use `$implement-game-feature` when the requested outcome is a working code or content change.
- Use `$review-game-design` or `$review-game-code` for evidence-backed critique. Keep review read-only unless the user also asks for changes.
- Use `$plan-game-qa` for test strategy and acceptance evidence, and `$analyze-game-playtests` for existing observations or telemetry.
- Use `$plan-game-production` for milestones, vertical slices, epics, stories, sequencing, estimates, or status.

For browser games, route creation and implementation to the installed `$game-studio` router so its browser-specific foundation, framework, asset, UI, and playtest skills remain authoritative. If it is unavailable, use the focused workflow above, state that browser-specialist guidance was unavailable, and validate with the project's own tools.

For Godot-specific architecture, implementation, or debugging, use installed `$godot-master` guidance in addition to the focused workflow. If it is unavailable, continue with the shared engine adapter referenced by the focused skill. Do not block engine-neutral design work on an engine specialist.

Read [integration boundaries](../../references/integrations.md) when another installed game skill may overlap.

## Execute a coherent slice

1. Create or update a task plan when the work has multiple dependent steps. Keep one step active and tie each step to an observable deliverable.
2. Preserve the chain from player goal to design rule to technical responsibility to validation evidence. Do not advance into implementation while a decision that changes architecture or scope remains unresolved.
3. Use subagents only for independent research, audits, or reviews that can run without overlapping writes. Select roles dynamically from [subagent roles](../../references/subagent-roles.md); do not create a standing hierarchy.
4. Load only the references needed for the current phase. Record durable decisions in project artifacts when the user requests or the repository convention requires them; do not invent a parallel session-state system.
5. Reassess routing when new evidence changes the engine, scope, stage, or risk. Update the plan rather than silently continuing under stale assumptions.

Follow [framework principles](../../references/framework.md) for evidence, scope, decision traceability, and handoffs.

## Finish with evidence

Report the outcome first, then list changed artifacts, decisions, validation performed, limitations, and the next meaningful step. Distinguish completed work from proposed work and unverified runtime behavior. A document is complete only when its downstream consumer can act on it; an implementation is complete only when proportionate validation supports the claim.
