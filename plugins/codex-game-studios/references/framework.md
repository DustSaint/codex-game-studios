# Framework contract

Use the smallest workflow that can produce a verifiable result.

## Lifecycle

1. **Orient** — inspect repository facts, existing artifacts, constraints, and
   current stage. Do not manufacture a new directory scheme for an established
   project.
2. **Concept** — define player fantasy, verbs, core loop, pillars, audience,
   boundaries, risks, and the riskiest falsifiable assumption.
3. **Design** — specify observable rules, states, formulas, feedback, tuning
   surfaces, dependencies, edge cases, and acceptance criteria without choosing
   code architecture prematurely.
4. **Technical design** — detect the engine, assign ownership, model data flow
   and APIs, record consequential decisions, and select evidence.
5. **Delivery** — implement a bounded ready feature, preserve repository
   conventions, add proportionate tests, and report residual uncertainty.
6. **Review and QA** — use independent review when risk warrants it; map every
   criterion to evidence and distinguish passed, failed, blocked, and not run.
7. **Learn and plan** — convert observed playtest results into decisions, then
   update milestones and scope without rewriting history.

## Source-of-truth order

Prefer, in order:

1. current repository behavior and configuration;
2. accepted project decisions and specifications;
3. current official engine or platform documentation;
4. explicit user statements;
5. clearly labelled assumptions.

If two higher-priority sources conflict, surface the conflict before making a
direction-changing edit.

## Traceability

Use stable identifiers only when the project already uses them or the user
adopts the workflow. A useful chain is:

`player outcome -> design requirement -> technical decision -> work item -> acceptance criterion -> evidence`

Do not renumber existing identifiers merely to make a document look tidy.

## Validation boundary

- A file diff proves only the file diff.
- A passing unit test proves the exercised logic, not visual feel or platform
  behavior.
- A successful build proves compilation or packaging, not gameplay quality.
- A playtest observation proves what happened in that session, not why it
  happened or whether all players behave the same way.

State these limits whenever they matter to the conclusion.
