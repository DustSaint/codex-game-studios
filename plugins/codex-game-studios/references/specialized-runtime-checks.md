# Specialized runtime checks

Load only the sections that match the changed system. Treat project design,
platform targets, and measured baselines as authoritative. Do not import fixed
budgets, naming schemes, or architecture rules from another game without
evidence that they apply here.

## Data and configuration

- Follow the repository's established schema and naming conventions.
- Define validation, defaults, versioning, migration, and failure behavior.
- Reject malformed or out-of-range data visibly at the owning boundary.
- Check references in both directions so removed content does not leave orphaned
  identifiers and new entries are actually consumed.
- Document the meaning, unit, safe range, and source of tunable values.

## Gameplay and AI

- Keep time-dependent behavior frame-rate independent and use the project's
  authoritative time source.
- Make state ownership and transitions explicit, observable, and testable.
- Keep tuning and behavior parameters in the established authoring-data layer.
- Give player-facing AI readable intent and recovery windows when the design
  requires them; expose enough state to diagnose decisions and navigation.
- Establish a project-derived update budget and profile representative load
  before and after performance work.
- Validate any client or content input before it can influence authoritative
  gameplay state.

## Networking

- Identify authority for every gameplay-critical mutation and validate incoming
  sizes, ranges, identities, ordering, and permissions.
- Define message or schema compatibility, replication frequency and reliability,
  prediction, reconciliation, and rollback where relevant.
- Cover disconnect, reconnect, ownership transfer, host migration, duplication,
  and out-of-order delivery according to the actual network model.
- Measure bandwidth and logging under representative player and entity counts;
  rate-limit diagnostics that could amplify a failure.

## UI, accessibility, and localization

- Keep game-state ownership outside presentation; send commands or events to the
  owning system instead of mutating state from UI widgets.
- Cover the supported input devices, focus changes, pause and time scale,
  navigation, minimum and maximum resolutions, and safe areas.
- Route player-facing text and variables through the project's localization
  system and verify expansion, pluralization, and layout pressure.
- Respect motion, text-scale, contrast, color, audio, and remapping requirements
  established by the project. Do not assume one feedback channel is sufficient.

## Rendering and shaders

- Record the target platform, render pipeline, quality tiers, and measurable
  complexity budget.
- Use named parameters and constants with units; explain non-obvious math and
  the visual purpose of each exposed control.
- Review precision, texture samples, loops, branching, variant count, resource
  lifetime, and fallback behavior against the target hardware.
- Test the actual supported pipelines and quality tiers. A successful compile is
  not evidence of visual correctness or frame-time compliance.

## Prototypes

- State the falsifiable hypothesis, run instructions, status, and findings.
- Isolate prototype code and assets from production dependencies and shipping
  paths; do not let production code import the experiment.
- If the result graduates, carry forward the evidence and rewrite the behavior
  to production architecture and validation standards.

## Tests

- Keep unit tests deterministic and independent of shared mutable external
  state; use explicit fixtures and clean up integration state.
- Name tests for the system, scenario, and observable result, and keep setup,
  action, and assertions legible.
- Give performance tests an evidence-based threshold and representative setup.
- Add a regression test or explicit regression procedure for a root-cause fix.

