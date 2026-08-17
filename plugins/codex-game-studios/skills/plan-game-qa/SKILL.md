---
name: plan-game-qa
description: Plan evidence-based QA coverage for a game feature, milestone, regression pass, or release candidate. Use when requirements need test cases, risk coverage, evidence mapping, or quality gates; do not use to execute a browser playtest or to claim unverified results.
---

# Plan Game QA

Turn requirements and risks into a traceable QA plan. Treat planning, execution, and evidence review as different states.

## Load the QA Contract

Read [QA evidence rules](../../references/qa-evidence.md) before assigning statuses or defining a quality gate. Use [the QA plan template](../../assets/templates/qa-plan.md) when creating a durable plan.

## Build the Plan

1. Establish the test target.
   - Record the feature or milestone, build or revision, platform, environment, audience, and schedule constraints.
   - Identify authoritative requirement sources, prior defects, known risks, and supported configurations.
   - Mark missing or conflicting inputs as unknown. Ask for a decision when an unknown would materially change coverage.

2. Normalize the requirements.
   - Give every acceptance criterion a stable identifier and preserve its source.
   - Rewrite ambiguous criteria as proposed, observable outcomes; do not silently change approved intent.
   - Flag criteria that cannot yet be tested because the oracle, instrumentation, build, or environment is missing.

3. Create an evidence matrix.
   - Map every acceptance criterion to at least one verification activity and one expected evidence artifact.
   - Record the level, setup, data, steps, expected result, platform, owner or capability, and automation suitability.
   - Add negative, boundary, recovery, and interaction cases where risk justifies them.
   - Keep requirement coverage explicit rather than hiding it inside prose.

4. Add risk-based coverage.
   - Select only the relevant categories: smoke, functional, integration, regression, compatibility, performance, accessibility, localization, save migration, networking, security, or soak.
   - Rank risks by player impact, likelihood, detectability, and recovery cost.
   - Prioritize critical paths and irreversible player harm before breadth or polish.

5. Define gates and rerun policy.
   - State entry conditions, exit conditions, blocker rules, allowed residual risk, and required sign-off evidence.
   - Define when a failed case must be rerun and what nearby regression coverage is required after a fix.
   - Record waivers with an owner, rationale, mitigation, and expiry; never use a waiver to relabel a failure as a pass.

6. Deliver the plan.
   - Use the template for a maintained artifact, or present the same sections inline for a small request.
   - End with coverage gaps, unresolved decisions, execution order, and the next responsible role.

## Preserve Evidence Integrity

Use these statuses consistently:

- `NOT RUN`: planned but not executed; this is the default for a new plan.
- `PASS`: executed against the stated build and environment, with the expected result observed and traceable evidence retained.
- `FAIL`: executed and an expected result was not met.
- `BLOCKED`: execution could not complete; name the blocking condition.

Never mark `PASS` from a code review, a successful build, a claimed fix, an old run against another revision, or the absence of reported defects. Never invent logs, screenshots, telemetry, tester observations, or coverage. If evidence is incomplete, say exactly what is missing.

## Route Follow-up Work

- Route browser-game test execution to `$game-playtest`; return here afterward to reconcile its evidence with the plan.
- Route analysis of existing playtest notes or telemetry to `$analyze-game-playtests`.
- Route missing implementation to `$implement-game-feature`.

This skill plans QA and may assess evidence already supplied. Do not run tests, change code or builds, file defects, update trackers, publish gates, or contact people unless the user explicitly authorizes that separate action.
