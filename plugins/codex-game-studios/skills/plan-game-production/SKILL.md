---
name: plan-game-production
description: Plan game milestones, vertical slices, epics, stories, estimates, dependencies, and status. Use to select required artifacts and sequence design, implementation, integration, QA, or release-readiness work; do not implement features, execute releases, or change external systems.
---

# Plan Game Production

Turn a game objective into an evidence-based delivery plan with visible scope, dependencies, risk, and confidence.

## Load the Production Contract

Read [production planning guidance](../../references/production.md) before estimating or declaring status. Use [the production plan template](../../assets/templates/production-plan.md) for a durable plan.

## Choose the Planning Horizon

Match detail to the decision:

- Use a milestone or vertical-slice plan to prove a player-valued outcome across disciplines.
- Use epics and stories to decompose an approved outcome into verifiable work.
- Use a sprint plan to select work against demonstrated capacity and current dependencies.
- Use a status review to report evidence, variance, blockers, and forecast changes.
- Use release preparation to plan gates and responsibilities; do not execute the release.

## Build the Plan

1. Establish the baseline.
   - Record the product objective, project stage, target player outcome, scope boundary, target window, team capabilities, constraints, and source documents.
   - Distinguish fixed constraints from negotiable assumptions.
   - Mark unknown capacity, dates, dependencies, and approval paths instead of guessing them.

2. Define the demonstrable outcome.
   - Express the milestone as something a player or stakeholder can experience and evaluate.
   - Separate must-have proof from desirable breadth and polish.
   - Define done with design, implementation, content, performance, and QA evidence where relevant.

3. Decompose work.
   - Create outcome-oriented epics, then independently verifiable stories or tasks.
   - Give each item a deliverable, acceptance criteria, dependencies, responsible capability, estimate range, confidence, and evidence of completion.
   - Include integration, content, tooling, QA, platform, and release work that the outcome genuinely requires.
   - Avoid splitting work so narrowly that ownership or end-to-end validation disappears.

4. Sequence dependencies.
   - Map prerequisite, integration, approval, asset, platform, and test-environment dependencies.
   - Identify the critical path, parallelizable branches, decision points, and integration checkpoints.
   - Limit work in progress and place early validation before expensive downstream production.

5. Estimate honestly.
   - Prefer historical throughput and comparable work when available.
   - Use ranges and confidence levels; state assumptions and excluded work.
   - Separate effort from elapsed time and capacity from aspiration.
   - Add contingency for identified uncertainty rather than hiding it inside every estimate.

6. Manage risk and change.
   - Maintain risks with trigger, impact, mitigation, owner or capability, and fallback.
   - Define scope-cut order before the schedule is threatened.
   - When inputs change, show the effect on scope, sequence, capacity, evidence, and forecast.

7. Report status from evidence.
   - Keep `DONE`, `IN PROGRESS`, `BLOCKED`, and `NOT STARTED` distinct.
   - Mark work done only when its acceptance criteria and required evidence are satisfied.
   - Report variance from the baseline, blockers, decisions needed, and forecast confidence.

8. Deliver the plan.
   - Use the template for a maintained artifact, or present the same fields inline for a small request.
   - End with the critical path, top risks, immediate decisions, next checkpoint, and proposed owners.

## Route Specialized Work

- Route unresolved player experience or system design to `$design-game` or `$design-game-feature`.
- Route architecture decisions to `$write-game-technical-design`.
- Route implementation to `$implement-game-feature`.
- Route quality strategy and evidence mapping to `$plan-game-qa`.

This skill may inspect project artifacts and produce a proposed plan. It does not implement work, ship builds, execute releases, assign people, create or update tracker items, change calendars, publish status, or send messages. Perform any such external state change only after the user explicitly authorizes the exact action and scope.
