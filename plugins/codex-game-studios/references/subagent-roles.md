# Dynamic collaboration roles

Use subagents only when independent work can run concurrently or when an
independent reviewer materially improves confidence. Give each subagent a
bounded question, precise evidence scope, and non-overlapping file ownership.
The primary agent remains responsible for integration and user communication.

Select a temporary lens rather than instantiating a permanent organization:

- **Creative direction:** pillars, audience, differentiation, scope coherence.
- **Game or systems design:** rules, loops, formulas, tuning, interactions.
- **Level or content design:** spatial flow, encounters, teaching, pacing.
- **Art, audio, or UX:** readable feedback, asset constraints, accessibility.
- **Technical direction:** architecture, engine fit, integration and lifecycle.
- **Implementation:** one engine-aware, file-bounded delivery task.
- **QA:** criterion coverage, failure modes, regression and evidence quality.
- **Production:** dependencies, estimates, milestones, risk and forecast.
- **Independent review:** challenge assumptions and inspect high-risk boundaries.

Do not use subagents to simulate approval chains. Do not parallelize edits to
the same files. Integrate partial results even when one line of work blocks,
and report the blocker explicitly.
