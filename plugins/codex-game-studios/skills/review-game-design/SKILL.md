---
name: review-game-design
description: "Review one or more game-design documents for clarity, consistency, balance risk, scope, player experience, and implementation readiness. Use for GDD, feature, economy, progression, combat, level, or cross-document reviews; remain read-only unless the user explicitly asks for revisions."
---

# Review Game Design

Find design defects that can change player outcomes or mislead production. Keep the review engine-neutral and base every finding on the supplied design, repository evidence, or a clearly labeled inference.

## Set the Review Contract

1. Establish the documents, versions, feature boundary, intended audience, target experience, and requested depth.
2. Read linked sources needed to test consistency. State any missing or stale source that limits confidence.
3. Use [review-rubrics.md](../../references/review-rubrics.md) as the common severity and verdict rubric.
4. Use [game-design.md](../../assets/templates/game-design.md) or [feature-brief.md](../../assets/templates/feature-brief.md) only as completeness guides; do not penalize a different structure that communicates the same decisions.

Do not load an engine adapter. If feasibility depends on a specific engine or repository implementation, identify the dependency and recommend a `$write-game-technical-design` pass rather than reshaping the game design around an assumed API.

## Trace the Intended Experience

Reconstruct the design as a causal chain:

`player intent -> available action -> rule resolution -> state change -> feedback -> next decision`

Walk through representative scenarios, failure cases, interruption, repetition, mastery, and exploitation. Check whether the documented rules actually produce the stated fantasy, pillars, emotions, and target behaviors.

Across documents, reconcile:

- terminology, units, formulas, probabilities, and timing;
- state ownership, dependencies, unlocks, rewards, and resource flows;
- onboarding, feedback, accessibility, failure, recovery, and edge cases;
- progression pacing, economy sources and sinks, dominant strategies, and degenerate loops;
- content burden, tuning surface, production scope, and testability;
- acceptance criteria and unanswered decisions.

Do not manufacture numerical balance certainty without data. Flag unvalidated tuning assumptions and propose the smallest simulation, spreadsheet, prototype, or playtest that could resolve them.

## Write Actionable Findings

Lead with findings, ordered by player and production impact. For each finding include:

- severity and concise title;
- exact document section or evidence;
- the contradiction, omission, ambiguity, or exploitable outcome;
- why it matters in a concrete player or implementation scenario;
- the decision needed or corrective direction;
- confidence and any missing evidence.

Keep style preferences and optional enhancements separate from defects. Do not report speculative problems as facts, and do not bury a blocking contradiction in a general summary.

Finish with:

- a verdict: `ready`, `ready with conditions`, or `revise`;
- strengths worth preserving;
- open decisions and validation experiments;
- a cross-document consistency summary when multiple sources were reviewed.

This workflow is read-only. Edit the design only when the user explicitly asks to apply the review, and preserve deliberate decisions while resolving the cited findings.
