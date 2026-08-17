# Codex Game Studios v0.1.1 Port Report

Date: 2026-08-17
Status: validated Codex-native public release

## Outcome

The upstream game-studio workflow has been rebuilt as a Codex-native plugin,
not wrapped as a compatibility layer. The port preserves the useful lifecycle,
game-domain reasoning, decision traceability, engine-aware delivery, and QA
evidence discipline while deleting the source runtime's fixed organization,
model tiers, command relay, automatic session state, and global shell hooks.

The staged package exposes 11 focused Codex skills:

1. `manage-game-development`
2. `brainstorm-game-concept`
3. `design-game`
4. `design-game-feature`
5. `write-game-technical-design`
6. `implement-game-feature`
7. `review-game-design`
8. `review-game-code`
9. `plan-game-qa`
10. `analyze-game-playtests`
11. `plan-game-production`

The complete one-to-one disposition of all 73 upstream skill entries is in
`CODEX_MIGRATION_PLAN.md`.

## Audited source

- Repository: `https://github.com/donchitos/claude-code-game-studios`
- Commit: `984023ddac0d5e27624f2baacde6105e45de375f`
- Release marker: `v1.0.0`
- License: MIT, Copyright 2026 Donchitos

Audited surface:

- 73 skills
- 49 static agents, including 15 engine-specific agents
- 12 lifecycle hooks and one status-line program
- 11 scoped rule files
- 40 document templates
- 46 version-sensitive engine reference files

The original MIT license and an adaptation notice are included in the package.

## Official migration audit

The follow-up audit ran OpenAI's official `migrate-to-codex` skill and CLI at
commit `49f948faa9258a0c61caceaf225e179651397431` against the audited upstream
source in an isolated target. It generated 73 skill files and 49 custom-agent
files, but reported 123 semantic items requiring manual repair. Its syntax
validator passed the generated structure; that does not make the mechanical
output behaviorally equivalent or suitable for distribution.

The audit confirmed that the existing 11-skill architecture is the appropriate
Codex-native destination. It also found that the official inventory does not
enumerate the source's 11 scoped rule files. Their reusable behavior is now
covered by `references/specialized-runtime-checks.md` and loaded selectively by
technical design, implementation, code review, and QA. See
`OFFICIAL_MIGRATION_AUDIT.md` for commands, findings, dispositions, and limits.

## Architectural decisions

### Skills instead of command compatibility

The 73 command-like entries were grouped by lifecycle responsibility and
trigger boundary. Narrow tasks such as balance checks, sprint status, bug
triage, architecture decisions, and regression planning remain available as
modes or checklists inside the owning skill rather than as 73 competing trigger
descriptions.

### Dynamic collaboration instead of a static studio org chart

The port contains a concise role reference for creative direction, systems,
level/content, art/audio/UX, technical direction, implementation, QA,
production, and independent review. Codex creates a subagent only for a bounded
independent task or independent review. No reporting hierarchy or model name is
encoded in the runtime.

### Engine-neutral design, engine-aware delivery

Concept and game design remain engine-neutral. Technical design,
implementation, code review, and engine QA use a read-only detector and load
exactly one adapter for Unity, Unreal, or Godot after repository evidence is
found. Version-sensitive API claims must be verified against official
documentation for the detected project version.

Browser projects route implementation, UI, asset, and interactive playtest work
to the official Codex Game Studio skill family. Godot implementation can use an
installed `godot-master` specialist when available. The plugin continues safely
with its own boundary guidance when an adjacent specialist is unavailable.

### No automatic hooks

No upstream hook is installed. Useful behavior was reassigned as follows:

- project and stage discovery: explicit read-only orientation;
- asset, document, and package checks: deterministic scripts invoked on demand
  or from project CI;
- compaction, notifications, and subagent state: Codex-native behavior;
- commit, push, deployment, and release safety: explicit authorization plus
  repository protections;
- skill validation: `skill-creator`, plugin validation, and local eval scripts.

This removes install-time shell execution and automatic injection of worktree
state into model context.

### Optional scoped project guidance

Root, design, code, and documentation `AGENTS.md` templates are shipped as
assets. Installation does not copy them into any game project. A user must ask
to adapt or copy them into a target repository.

## Validation results

### Structural and deterministic checks

The final staged package passed:

- official plugin structure validation: 1/1 plugin;
- `skill-creator` quick validation: 11/11 skills;
- runtime legacy-identifier scan: no findings;
- skill resource-link and placeholder scan: no findings;
- routing matrix schema and coverage: 20 cases, all 11 skills, explicit no-match
  behavior, and Unity, Unreal, Godot, browser, and unknown-engine coverage;
- Python unit tests: 13/13, comprising 9 engine-detector tests and 4 validator
  tests;
- engine fixtures: Unity, Unreal, Godot, and browser each detected at high
  confidence; the unknown fixture remained unknown;
- final combined package runner: 16/16 check groups.

The package runner disables Python bytecode generation. Generated cache and
bytecode files were removed before packaging so the distributed artifact is
source-reviewable.

### Trigger forward tests

An independent first-pass classification found one true routing mismatch and
two ambiguous boundaries:

- a request only for a vertical-slice production plan belonged to
  `plan-game-production`, not the broad coordinator;
- connected economy/progression redesign needed a sharper boundary from one
  contained feature;
- browser work needed to distinguish the local entry skill from downstream
  official specialist skills.

Descriptions and the evaluation contract were corrected. A fresh independent
classification then matched all 20/20 cases with no remaining ambiguous
overlap. The browser routing forward test selected:

`manage-game-development -> game-studio -> phaser-2d-game + game-ui-frontend -> game-playtest`

It correctly reported that the minimal browser fixture was not runnable and did
not claim a build or playtest.

### Unity end-to-end forward test

The shipped `tests/e2e/unity-energy-dash` fixture exercised one complete
engine-specific chain:

`design-game-feature -> write-game-technical-design -> implement-game-feature -> plan-game-qa`

The chain produced:

- a player-behavior feature contract;
- a Unity-aware technical design;
- an atomic stamina-gated dash implementation using the existing owner;
- runtime and EditMode test assembly definitions;
- six EditMode tests covering success, cooldown rejection, insufficient
  stamina, exact-cost behavior, exact cooldown boundary, and invalid
  composition;
- a criterion-to-evidence QA plan and validation record.

Available local validation compiled the runtime with warnings treated as errors
and ran a headless contract harness: 6/6 checks passed. JSON assembly and package
descriptors parsed successfully. The project detector reported Unity only,
score 100, with no warnings.

Unity Editor was unavailable. Unity Test Runner, project import, Play Mode,
movement, animation, camera, input, and production caller integration remain
explicitly blocked or NOT RUN. The port does not present the headless harness as
proof of those behaviors.

### Security and installation-impact audit

The final source contains:

- no lifecycle hooks, install scripts, MCP servers, or automatic commands;
- no programmatic network requests or credential handling;
- no dependency installer, destructive command, shell evaluation, or unsafe
  deserialization;
- no automatic edits to a game project;
- explicit authorization boundaries for commit, push, deployment, release,
  store upload, messages, trackers, and other external state changes.

The combined validation runner executes bundled test code and optional
caller-selected validators. It is intentionally documented as a test runner for
reviewed source, not a safe scanner for an untrusted package.

Residual risk is low for installation itself. Later use of the implementation
skill can edit the game project and run project checks within the user's normal
Codex sandbox and approval model. Copying optional `AGENTS.md` guidance creates
persistent project instructions and therefore remains an explicit user action.
Delegated browser or Godot specialist behavior belongs to separately installed
skills and is outside this package's security boundary.

## Installation impact

The public marketplace installation will:

1. register this repository as the `codex-game-studios` marketplace;
2. install the reviewed `plugins/codex-game-studios` package through the Codex
   plugin manager;
3. require a new Codex task before newly installed skills are available.

It will not modify a game repository, install engine packages, start a service,
or register hooks. Marketplace retrieval contacts GitHub; later external actions
remain subject to explicit user authorization and Codex's sandbox model.
