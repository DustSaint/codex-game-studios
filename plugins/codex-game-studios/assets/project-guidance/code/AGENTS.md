# Game code guidance

- Read the accepted feature behavior and technical decisions before editing.
- Follow existing engine, module, scene, asset, and test conventions.
- Make ownership, lifetime, initialization, teardown, and failure behavior
  explicit at runtime boundaries.
- Keep configurable game values in the project's established data layer.
- Add proportionate automated or manual evidence with the implementation.
- Do not skip, mute, or weaken a failing test to complete a change.
- Comments should explain intent, invariants, constraints, and non-obvious
  tradeoffs that future agents need to preserve.
