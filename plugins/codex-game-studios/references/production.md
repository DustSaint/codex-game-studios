# Production planning model

## Planning hierarchy

- A **vertical slice** proves one representative complete loop at a deliberate
  quality bar and exposes production capability and cost.
- A **milestone** has an outcome, entry criteria, exit evidence, explicit
  exclusions, dependencies, risks, and decision date.
- An **epic** owns a player or technical outcome and aligns to a coherent system
  or architecture boundary.
- A **story** is a bounded verifiable increment with source requirements,
  dependencies, acceptance criteria, and evidence type.
- A **task** is an implementation step, not a substitute for an outcome.

## Estimates

Estimate ranges, assumptions, uncertainty, dependency risk, content volume,
integration cost, test cost, and review cost. Do not present a point estimate as
certainty. Calibrate against project history when available and update the
forecast when evidence changes.

## Status

Report completed outcomes, current work, blockers, decisions needed, validation
state, scope movement, and forecast movement separately. A commit, calendar
event, or message is not evidence that the corresponding product outcome was
delivered.

## Readiness gates

Before implementation, check design clarity, technical ownership, dependencies,
acceptance criteria, evidence plan, and scope. Before a milestone or release,
separate artifact integrity, automated quality, manual or experiential quality,
operational readiness, rollback, observability, and unresolved risk.

Planning and review do not authorize commit, push, deployment, release, store
submission, data migration, or live-operation changes.
