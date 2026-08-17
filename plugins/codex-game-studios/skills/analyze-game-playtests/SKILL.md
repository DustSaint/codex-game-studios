---
name: analyze-game-playtests
description: Analyze existing game playtest observations, recordings, surveys, and telemetry into traceable findings and follow-up experiments. Use after evidence exists; do not fabricate observations or use this skill to run an interactive browser playtest.
---

# Analyze Game Playtests

Convert observed player behavior into evidence-backed findings without confusing interpretation with fact.

## Load the Analysis Contract

Read [QA evidence rules](../../references/qa-evidence.md) before judging confidence or claiming validation. Use [the playtest analysis template](../../assets/templates/playtest-analysis.md) for a durable report.

## Confirm the Evidence Boundary

1. Inventory each available source: session, build or revision, platform, scenario, cohort, date, observer, and artifact location.
2. Note missing context, incomplete recordings, instrumentation changes, excluded sessions, and sampling bias.
3. Separate these layers throughout the report:
   - direct observation or participant statement;
   - measured value and its denominator;
   - interpretation;
   - root-cause hypothesis;
   - recommendation.
4. If no playtest evidence exists, request it or propose what to collect. Do not create synthetic results.

When the user asks to conduct an interactive browser-game session, route execution to `$game-playtest`. Analyze the resulting notes, screenshots, logs, and traces only after that execution returns evidence.

## Analyze the Sessions

1. Normalize observations.
   - Assign stable observation IDs and link each one to its source and timestamp or event where available.
   - Preserve the participant's meaning when paraphrasing; mark verbatim quotations explicitly.
   - Distinguish expected behavior from observed behavior.

2. Identify patterns.
   - Group observations by player goal, friction point, misunderstanding, emotion, strategy, pacing, usability, balance, or defect.
   - Record frequency with the sample size and denominator. Do not treat repeated notes from one source as independent sessions.
   - Compare segments only when their conditions and metric definitions are compatible.

3. Test interpretations.
   - Relate findings to the intended player experience, design pillars, feature acceptance criteria, and prior hypotheses.
   - List plausible alternative explanations and confounders.
   - Label causal claims as hypotheses unless the evidence actually isolates causality.

4. Prioritize findings.
   - Consider player impact, frequency, confidence, strategic relevance, and recovery cost.
   - Use ranges or qualitative bands when the data does not support numerical precision.
   - Keep rare catastrophic failures visible even when frequency is low.

5. Recommend the smallest learning step.
   - Choose among a design change, implementation fix, tutorial or UX change, instrumentation change, targeted retest, broader study, or no action.
   - Give each recommendation an owner or capability, expected outcome, acceptance criterion, and validation method.
   - Make dependencies and reversibility explicit.

6. Produce the report.
   - Use the template for multiple sessions or a maintained project artifact.
   - End with confirmed findings, tentative hypotheses, rejected hypotheses, evidence gaps, prioritized actions, and the next experiment.

## Protect Research Integrity

Never invent participants, quotations, telemetry, timings, screenshots, defects, or consensus. Do not generalize beyond the sampled build, cohort, and scenario without stating the limitation. Treat missing data as missing, not as success.

This skill analyzes supplied evidence. Do not modify game design or code, create tracker items, publish conclusions, message participants, or schedule follow-up sessions unless the user explicitly authorizes that separate external change.
