# Codex Game Studios v0.1 Migration Plan

## Goal

Build a Codex-native game-development plugin from the useful behavior in
`donchitos/claude-code-game-studios`, without preserving its Claude-specific
runtime, hierarchy, commands, or session machinery.

The migration optimizes for behavioral equivalence first. File layout is kept
only where it improves discoverability, validation, or maintenance in Codex.

## Source Baseline

- Upstream repository: `https://github.com/donchitos/claude-code-game-studios`
- Audited commit: `984023ddac0d5e27624f2baacde6105e45de375f`
- Upstream release marker: `v1.0.0`
- License: MIT, Copyright 2026 Donchitos

Inventory at the audited commit:

- 73 skill entry points
- 49 static agent definitions, including 15 engine-specific roles
- 12 lifecycle hooks plus one status-line script
- 11 path-scoped rule files
- 40 document templates
- 46 version-sensitive engine reference files

## Root-Cause Finding

The incompatibility is architectural, not syntactic. The upstream behavior is
coupled to a fixed 49-role reporting hierarchy, model tiers, Claude tool names,
slash-command handoffs, per-file approval prompts, `.claude/` state, and shell
hooks that inject repository data into context. Translating frontmatter or
renaming directories would retain the wrong runtime model.

The Codex port therefore keeps the lifecycle, decision records, traceability,
test-evidence discipline, and game-domain review knowledge while replacing the
orchestration layer with Codex skills, scoped `AGENTS.md` templates, native
planning, optional subagents, and explicit deterministic validation scripts.

## v0.1 Architecture

The plugin exposes 11 non-overlapping skills:

1. `manage-game-development` — orient within a project, infer its stage, and
   route to the next bounded workflow.
2. `brainstorm-game-concept` — turn a blank or vague idea into a testable game
   concept, core loop, pillars, audience, scope, and risks.
3. `design-game` — specify game systems and cross-system behavior without
   selecting an implementation.
4. `design-game-feature` — turn one bounded feature into an implementation-ready
   behavior contract and acceptance criteria.
5. `write-game-technical-design` — define requirements, ownership, data flow,
   APIs, ADRs, and engine-aware constraints.
6. `implement-game-feature` — deliver one ready feature with scoped code,
   tests, and evidence.
7. `review-game-design` — review one or more design artifacts for completeness,
   consistency, balance, scope, and implementability.
8. `review-game-code` — perform a game-specific code review covering runtime
   lifecycle, frame costs, state ownership, resources, and testability.
9. `plan-game-qa` — map acceptance criteria and risks to automated, integration,
   manual, visual, performance, and regression evidence.
10. `analyze-game-playtests` — convert existing playtest observations or
    telemetry into findings, confidence, and prioritized design actions.
11. `plan-game-production` — create vertical-slice, milestone, epic, story,
    sprint, estimate, status, and risk plans without implementing them.

The 11 skills intentionally do not reproduce every upstream slash command.
Narrow operations become modes or checklists within the closest lifecycle
skill, which keeps trigger descriptions precise and reduces context pressure.

## Complete Upstream Skill Disposition

Every upstream skill has one disposition and a v0.1 destination.

### Orient and concept

| Upstream | Disposition | Destination |
|---|---|---|
| `start` | Rewrite | `manage-game-development` |
| `adopt` | Merge | `manage-game-development` |
| `project-stage-detect` | Merge | `manage-game-development` |
| `help` | Merge | `manage-game-development` |
| `onboard` | Merge | `manage-game-development` |
| `reverse-document` | Merge | `manage-game-development` |
| `brainstorm` | Rewrite | `brainstorm-game-concept` |

### Design

| Upstream | Disposition | Destination |
|---|---|---|
| `design-system` | Rewrite | `design-game` |
| `map-systems` | Merge | `design-game` |
| `quick-design` | Merge | `design-game-feature` |
| `design-review` | Merge | `review-game-design` |
| `review-all-gdds` | Merge | `review-game-design` |
| `consistency-check` | Merge | `review-game-design` |
| `propagate-design-change` | Merge | `review-game-design` |
| `art-bible` | Merge | `design-game` |
| `asset-spec` | Merge | `design-game-feature` |
| `ux-design` | Merge | `design-game` |
| `ux-review` | Merge | `review-game-design` |
| `balance-check` | Merge | `review-game-design` |
| `content-audit` | Merge | `review-game-design` |
| `asset-audit` | Merge | `review-game-design` |
| `localize` | Reference only | `design-game` and `review-game-design` |
| `team-audio` | Reference only | design-domain reference |
| `team-combat` | Reference only | design-domain reference |
| `team-level` | Reference only | design-domain reference |
| `team-narrative` | Reference only | design-domain reference |
| `team-ui` | Reference only | design-domain reference |

### Technical design and implementation

| Upstream | Disposition | Destination |
|---|---|---|
| `setup-engine` | Rewrite | engine detection in `manage-game-development` and technical workflows |
| `create-architecture` | Rewrite | `write-game-technical-design` |
| `architecture-decision` | Merge | `write-game-technical-design` |
| `architecture-review` | Merge | `write-game-technical-design` |
| `create-control-manifest` | Merge | traceability reference |
| `dev-story` | Rewrite | `implement-game-feature` |
| `story-readiness` | Merge | `design-game-feature` and `implement-game-feature` |
| `story-done` | Merge | `implement-game-feature` |
| `code-review` | Preserve behavior | `review-game-code` |
| `tech-debt` | Merge | `review-game-code` and `plan-game-production` |
| `perf-profile` | Preserve behavior | `review-game-code` |
| `security-audit` | Preserve behavior | `review-game-code` |

### Prototype and playtest

| Upstream | Disposition | Destination |
|---|---|---|
| `prototype` | Rewrite | existing Codex `prototype` skill or browser game plugin; experiment contract remains in `design-game-feature` |
| `vertical-slice` | Merge | `plan-game-production` plus implementation skills |
| `playtest-report` | Preserve behavior | `analyze-game-playtests` |

### Production

| Upstream | Disposition | Destination |
|---|---|---|
| `create-epics` | Rewrite | `plan-game-production` |
| `create-stories` | Merge | `plan-game-production` |
| `sprint-plan` | Merge | `plan-game-production` |
| `sprint-status` | Preserve behavior | `plan-game-production` |
| `estimate` | Preserve behavior | `plan-game-production` |
| `scope-check` | Preserve behavior | `plan-game-production` |
| `retrospective` | Preserve behavior | `plan-game-production` |
| `milestone-review` | Merge | `plan-game-production` |
| `team-live-ops` | Reference only | production reference |
| `team-polish` | Reference only | production and review references |

### QA, release, and maintenance

| Upstream | Disposition | Destination |
|---|---|---|
| `qa-plan` | Rewrite | `plan-game-qa` |
| `bug-report` | Merge | `plan-game-qa` |
| `bug-triage` | Merge | `plan-game-qa` |
| `regression-suite` | Merge | `plan-game-qa` |
| `smoke-check` | Merge | `plan-game-qa` |
| `soak-test` | Reference only | QA reference |
| `test-evidence-review` | Merge | `plan-game-qa` |
| `test-flakiness` | Merge | `plan-game-qa` |
| `test-setup` | Reference only | QA reference |
| `test-helpers` | Reference only | QA reference |
| `team-qa` | Merge | `plan-game-qa` |
| `gate-check` | Rewrite | `plan-game-production` readiness mode |
| `release-checklist` | Reference only | production reference |
| `launch-checklist` | Reference only | production reference |
| `team-release` | Merge | production reference |
| `hotfix` | Merge | production reference |
| `day-one-patch` | Merge | production reference |
| `changelog` | Reference only | production reference |
| `patch-notes` | Reference only | production reference |
| `skill-improve` | Remove | Codex `skill-creator` |
| `skill-test` | Remove | Codex skill validation and eval tooling |

The table contains all 73 upstream skills exactly once.

## Reusable Behavior

The port retains these cross-cutting contracts:

- Concept work moves from player fantasy to verbs, loop, pillars, audience,
  scope, and a falsifiable prototype question.
- Game design records inputs, state, rules, formulas, ranges, edge cases,
  dependencies, tuning surfaces, player feedback, and testable acceptance.
- Technical design maps stable requirements to module ownership, data flow,
  APIs, ADRs, and validation evidence.
- Delivery loads the relevant design and decisions first, changes only the
  requested scope, and cannot declare completion while required evidence is
  absent or failing.
- QA maps each acceptance criterion to an evidence type; unverified work is
  reported as unverified rather than passed.
- Production preserves the traceability chain from design requirement through
  technical decision, work item, acceptance criterion, and evidence.
- A concept prototype answers one risky hypothesis; a vertical slice tests a
  representative full loop and production capability. Prototype code is not
  silently promoted into production code.

## Removed Runtime Assumptions

The following do not appear in the installed runtime package:

- Claude-specific root files, directories, tools, commands, or model names
- static agent organization charts and escalation ladders
- per-file write approval and review-mode matrices
- automatic context injection at session or compaction boundaries
- fixed project paths such as `design/gdd/` or `production/session-state/`
- fixed engine versions or model-training-cutoff state
- global commit, push, notification, or release hooks

External state changes such as commit, push, deployment, store upload, and
release still require explicit user authorization through Codex's normal
approval and collaboration model.

## Hook Disposition

No upstream hook is installed in v0.1.

- Gap and project-state discovery become explicit, read-only orientation.
- Asset and document checks become deterministic scripts invoked by a skill,
  test, or CI when relevant.
- Compaction, notifications, and subagent status use Codex-native behavior.
- Commit, push, and release safety use user authorization plus repository CI
  and branch protection, not repository-supplied shell interception.
- Skill validation uses `skill-creator` validation and plugin eval scripts.

This avoids executing repository code simply because the plugin was installed
and avoids leaking worktree state into model context.

## Engine Strategy

Design remains engine-agnostic. Technical-design, implementation, review, and
QA workflows first inspect project markers and only then load one adapter:

- Unity: `Assets/`, `Packages/manifest.json`, and
  `ProjectSettings/ProjectVersion.txt`
- Unreal: a `.uproject` plus relevant `Source/`, `Config/`, or `Content/`
- Godot: `project.godot`, scenes, scripts, resources, and addons
- Browser: `package.json` plus Phaser, Three.js, or React Three Fiber markers

Version-sensitive APIs must be verified against official engine documentation
for the detected project version. The v0.1 end-to-end fixture and evaluation
path is Unity. Unreal and Godot are supported through concise adapters. Browser
games route to the installed official Codex `game-studio` skills instead of
duplicating their implementation, asset, UI, and playtest workflows.

## Codex-Native Project Guidance

The plugin itself includes maintenance-oriented root guidance. Optional target
project templates are provided for:

- root project decisions and validation boundaries
- design documents
- code/runtime work
- documentation and evidence

They are copied or adapted into a game project only when the user asks. The
plugin installation never edits an existing game repository.

## Validation Plan

The staged package must pass all of the following before installation:

1. `skill-creator` quick validation for every skill.
2. Codex plugin manifest and layout validation.
3. A runtime residue scan for forbidden Claude-specific assumptions.
4. Link and resource existence checks.
5. A 20-case routing/evaluation matrix covering concept, design, technical
   design, implementation, review, QA, playtest, production, engines, and
   browser handoff.
6. Engine detection fixtures for Unity, Unreal, Godot, browser, and unknown
   projects.
7. Forward tests in fresh subagent contexts with no expected answer supplied.
8. Manual inspection of at least one Unity lifecycle from concept/feature
   contract through technical plan, delivery contract, and evidence plan.

Installation into the user's personal plugin directories happens only after
the staged artifact, behavior changes, security impact, and installation paths
are summarized and explicitly approved.
