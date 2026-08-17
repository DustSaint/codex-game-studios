---
name: design-game-feature
description: Turn one contained game mechanic into an implementation-ready behavioral specification while surrounding economy, progression, and system contracts remain fixed. Use for bounded rules, states, edge cases, tuning, feedback, and acceptance criteria; use design-game for connected-system redesign and technical design for architecture.
---

# Design Game Feature

Define one feature precisely enough that design, engineering, content, art, audio, and QA share the same behavioral target without prematurely choosing implementation structure.

## Bound the feature

Read the concept, relevant game design, system map, current implementation, test evidence, and production constraints. State:

- the player problem, desired outcome, and pillar supported;
- target users, contexts, and prerequisite knowledge;
- in-scope behavior, explicit non-goals, and deferred extensions;
- entry and exit conditions;
- upstream dependencies and downstream consumers;
- success signals and failure risks.

If the feature changes several independent systems or the core/meta loop, use `$design-game` first. If architecture, data ownership, interfaces, or engine lifecycle is the central unknown, create the behavioral contract here and hand those decisions to `$write-game-technical-design`.

## Specify the behavioral contract

Define the feature as observable rules rather than an implementation sketch:

1. Describe the normal player flow from trigger through feedback and consequence.
2. Enumerate states and legal transitions, including cancellation, interruption, retry, save/load, disconnect, pause, and failure when relevant.
3. Define inputs, outputs, resources, events, eligibility, priority, timing, cooldowns, caps, reset points, and interactions with other systems.
4. Specify formulas with units, bounds, rounding, initial tuning ranges, and invariants. Label untested values as hypotheses.
5. Describe user-interface, control, accessibility, animation, visual, audio, narrative, and localization requirements only where they communicate behavior.
6. Cover boundary cases, abuse cases, conflicting actions, degraded states, and recovery. Do not omit a known failure mode by declaring it out of scope.
7. Define content and data needs, authoring responsibilities, telemetry questions, and migration or compatibility effects when relevant.

Use the relevant sections of [design domains](../../references/design-domains.md) and check the result against [design quality guidance](../../references/design-quality.md).

## Make acceptance verifiable

Write acceptance criteria as observable scenarios with preconditions, action, expected response, persisted state, and required evidence. Include at least:

- a primary success path;
- a boundary or invalid-input path;
- interruption or recovery behavior when state persists;
- one interaction with each critical dependency;
- player-facing feedback and accessibility expectations;
- measurable performance, scale, or content constraints only when grounded in project requirements.

Separate behavioral acceptance from technical implementation tasks. Do not claim balance, usability, or fun is validated without playtest evidence; state how it will be tested.

## Deliver the handoff

Complete [the feature brief template](../../assets/templates/feature-brief.md), omitting irrelevant sections rather than filling them with placeholders. Include decisions, assumptions, alternatives rejected, open questions, dependency owners, acceptance criteria, and follow-up artifacts.

When revising an existing feature, identify the changed behaviors and every affected design, technical, production, content, and QA artifact. End with the next unblocked step. If a material product choice remains unresolved, present the alternatives and obtain confirmation before downstream implementation.
