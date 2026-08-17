# Design quality contract

## System specification

For each system or feature, capture:

- player goal and fantasy;
- inputs, preconditions, and state;
- rules and state transitions;
- outputs, rewards, costs, and failure states;
- feedback through visuals, audio, haptics, UI, and camera as applicable;
- dependencies and ownership boundaries;
- tuning values, ranges, defaults, and data ownership;
- edge cases and exact expected outcomes;
- accessibility, localization, and platform constraints;
- acceptance criteria written as observable behavior;
- unresolved questions and decision owner.

For each formula, define every variable, unit, legal range, rounding rule, and
at least one worked example. For random systems, include distribution, seed or
replay expectations, pity or protection rules, and how outcomes are tested.

## Player-centered checks

- Can a player understand the next meaningful action?
- Does the loop produce the intended tension and release?
- Is mastery visible and attributable to player choices?
- Are failure, recovery, and loss states legible and fair?
- Can dominant strategies erase meaningful decisions?
- Does the feature reinforce at least one product pillar?
- What behavior would falsify the design hypothesis?

## Scope checks

Separate required behavior from polish, future extensions, and examples. Mark
content volume independently from system complexity. Prefer a small complete
loop over many disconnected mechanics.

## Change propagation

When changing an accepted design, search for affected formulas, UI, tutorials,
content, analytics, saves, networking, tests, production estimates, and other
documents. Report affected consumers before editing them.
