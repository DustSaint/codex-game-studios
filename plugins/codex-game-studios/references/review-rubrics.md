# Review rubrics

## Finding contract

Report actionable findings first, ordered by impact. Each finding should state:

- severity and confidence;
- exact artifact or code location;
- observed fact;
- violated requirement, decision, invariant, or player outcome;
- realistic consequence or reproduction path;
- fundamental corrective direction;
- validation needed after correction.

Do not inflate stylistic preferences into defects. If no actionable findings
remain, say so and list important validation gaps.

## Design review

Check completeness, internal consistency, cross-document conflicts, player
fantasy, core-loop contribution, formulas and edge cases, system cycles,
dominant strategies, failure and recovery, content burden, UX and accessibility,
technical feasibility, production scope, telemetry, and testability.

Walk at least one happy path, failure path, re-entry path, and boundary case.
For multi-document reviews, map shared terms, values, state owners, inputs,
outputs, and dependencies before judging consistency.

## Code review

Prioritize correctness and user-visible risk over style. Check:

- state ownership, invariants, save/load, rollback, and migration;
- initialization, teardown, scene or world transition, and re-entry;
- event, delegate, signal, async, thread, and cancellation lifetime;
- frame-loop cost, allocations, resource lifetime, and scale behavior;
- input, pause, time scale, focus, device, and accessibility behavior;
- networking authority, determinism, prediction, and security boundaries;
- data validation, editor/runtime separation, and platform configuration;
- compatibility with accepted design and technical decisions;
- tests that would fail for the defect and evidence still missing.

Review is read-only unless the user explicitly asks to fix findings.
