---
name: design-game
description: Create or revise whole-game and connected-system design, including core and meta loops, economy or progression redesign, balance, content, and cross-document consistency. Use for GDDs, system maps, or changes spanning multiple contracts; use design-game-feature for one contained mechanic whose surrounding contracts remain fixed.
---

# Design Game

Produce a coherent, testable game design in which player goals, rules, feedback, progression, and content reinforce the intended experience.

## Establish design truth

Read existing concept, design, production, test, and implementation evidence before drafting. Identify the authoritative sources and surface contradictions. Preserve confirmed decisions; label proposals, assumptions, and unresolved questions distinctly.

Define the design target:

- intended player fantasy and emotional arc;
- audience, platform, controls, accessibility needs, and session shape;
- pillars and anti-pillars;
- scope, constraints, and success criteria;
- target player verbs, decisions, mastery, expression, and failure recovery.

Keep the design engine-agnostic unless an engine constraint materially changes player-facing behavior. Send ownership, APIs, runtime structure, and engine implementation choices to `$write-game-technical-design`.

## Model the game as connected loops

Describe the moment-to-moment loop, session loop, and long-term loop as causal sequences: player action, system response, readable feedback, consequence, and next decision. Define entry, exit, win, loss, recovery, pause, save, and resume states where relevant.

Map explicit and implicit systems. For each system, state its purpose, player-facing rules, inputs, outputs, resources, events, dependencies, and tuning surface. Mark:

- hard dependencies and recommended design order;
- positive and negative feedback loops;
- resource sources, sinks, converters, caps, and reset points;
- progression gates and content dependencies;
- cross-system cycles, dominant-strategy risks, and failure cascades;
- ownership boundaries that require later technical decisions.

Use [the systems map template](../../assets/templates/systems-map.md) when relationships are a primary deliverable.

## Specify behavior precisely

For each major mechanic or system, define goals, rules, states, transitions, formulas, feedback, edge cases, failure behavior, recovery, accessibility, and acceptance evidence. Give every quantity a unit and every formula defined inputs, outputs, bounds, and rounding behavior. Treat initial values as tuning hypotheses, not proven balance.

Select only relevant domain guidance from [design domains](../../references/design-domains.md), such as combat, economy, progression, levels, narrative, social play, live operations, or user experience. Do not inflate the document with empty sections.

Walk representative scenarios through the connected systems, including a normal case, a failure or abuse case, and a progression case. Trace each pillar to concrete rules and each important rule to observable feedback. Apply [design quality guidance](../../references/design-quality.md) for clarity, feasibility, and testability.

## Produce actionable artifacts

Use [the game design template](../../assets/templates/game-design.md) for a full design document, adapting its sections to the game's needs. When revising an existing design:

1. state the decision or evidence that motivates the change;
2. update every affected rule, formula, dependency, scenario, and acceptance criterion;
3. identify downstream feature, technical, production, and QA artifacts that may now be stale;
4. summarize behavioral changes rather than silently rewriting history.

End with validated decisions, tuning hypotheses, unresolved questions, contradictions, risks, and concrete next tests. A complete design lets feature designers, engineers, artists, and QA infer the same intended behavior without inventing missing rules.
