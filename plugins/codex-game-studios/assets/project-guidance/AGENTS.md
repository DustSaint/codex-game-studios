# Game project guidance

- Preserve existing project conventions and source-of-truth locations.
- Separate observed repository facts, accepted decisions, assumptions, and
  proposals.
- Keep game design engine-agnostic; load engine-specific guidance only for
  technical design, implementation, code review, or engine QA.
- Trace player outcomes to requirements, technical decisions, work items,
  acceptance criteria, and evidence when the project uses those artifacts.
- Make the smallest coherent change that addresses the root cause.
- Never hide failures, weaken tests, or claim checks that were not run.
- Ask before destructive actions or external state changes such as commit,
  push, deployment, release, store upload, or live-data migration.
