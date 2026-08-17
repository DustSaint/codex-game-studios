# Integration boundaries

Use an installed specialist skill when its scope is narrower and more current
than this framework. Mention the handoff in the result so the user can see
which workflow owns the next action.

## Browser games

- `$game-studio` owns browser-game routing and foundation choices.
- Its Phaser, Three.js, React Three Fiber, asset, UI, and playtest skills own
  framework-specific implementation and live browser verification.
- Codex Game Studios still owns engine-neutral concept, design, QA planning,
  production planning, and analysis of evidence already collected.

## Godot

Use `$godot-master` for detailed Godot implementation, repair, and project
conventions when installed. The local Godot adapter remains the fallback and
the boundary contract for cross-engine workflows.

## Generic prototypes

Use `$prototype` for a deliberately disposable feasibility artifact. Define the
falsifiable game hypothesis and success evidence first, and keep prototype code
isolated from production code. Browser-game prototypes should use the official
browser-game workflow.

## UI prototypes

Use a high-fidelity prototype skill when the requested outcome is a visual or
interaction mock rather than production game runtime behavior. Preserve the
accepted game-design contract during the handoff.

## Availability

Do not assume an adjacent skill is installed. If it is unavailable, continue
with repository conventions and this plugin's focused workflow, state the
missing specialization, and do not fabricate specialist validation.
