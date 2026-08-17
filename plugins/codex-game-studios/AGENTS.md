# Plugin maintenance guidance

- Keep the framework engine-agnostic until technical design or implementation
  requires one detected engine adapter.
- Preserve traceability from player intent and design requirements through
  technical decisions, work items, acceptance criteria, and evidence.
- Treat observations, repository facts, assumptions, and proposals as distinct
  kinds of information.
- Match validation to the change: logic, integration, visual or feel, UI,
  configuration, performance, and platform behavior need different evidence.
- Never hide a failed check, weaken a test, or label missing evidence as a pass.
- Load only the references needed for the current workflow and detected engine.
- Parallelize independent research or review tasks only. Keep overlapping file
  edits with one owner and integrate all findings before dependent work.
- Require explicit user authorization before commits, pushes, deployments,
  releases, store uploads, or other external state changes.
- Keep comments focused on intent, constraints, and non-obvious reasoning so a
  future agent can maintain the behavior without reconstructing context.
