# OpenAI `migrate-to-codex` Audit

Date: 2026-08-17

## Scope

This audit compares the behavior-first Codex Game Studios port with OpenAI's
official `migrate-to-codex` skill and CLI at commit
`49f948faa9258a0c61caceaf225e179651397431`.

Audited source:

- repository: `https://github.com/donchitos/claude-code-game-studios`
- commit: `984023ddac0d5e27624f2baacde6105e45de375f`
- project source: `.claude/` plus the root `CLAUDE.md`
- migration target: an isolated workspace, never the source repository or the
  published plugin tree

The audit followed the official sequence: read the current differences and
product documentation, run `--scan-only`, `--plan`, `--doctor`, `--dry-run`,
perform a real isolated migration, inspect
`.codex/migrate-to-codex-report.txt`, and run `--validate-target`.

## Official tool result

| Surface | Detected or generated | Official result |
| --- | ---: | --- |
| Root instructions | 1 | Generated `AGENTS.md`; manual review required for provider-specific semantics |
| Skills | 73 | Generated 73 Codex skill files; every file required manual review for unsupported Claude metadata |
| Subagents | 49 | Generated 49 custom-agent files; every file required manual review for unsupported or changed fields |
| Hooks | 9 configured events using 12 scripts | Generated `.codex/hooks.json`; unsupported events and matcher behavior required review |
| MCP servers | 0 | Generated config with no MCP entries |
| Scoped rules | 11 | Present in the source but not enumerated by the official migration inventory |
| Status line | 1 | Present in the source but not a Codex plugin requirement |

The generated report contained 123 `manual_fix_required` rows and two
`rewritten` rows. The generated target passed the official syntax validator,
which proves that its TOML, skill frontmatter, agent TOML, and instruction size
were structurally valid. It does not resolve the 123 semantic review items.

On Windows, the current script initially read UTF-8 files through the system
GBK locale and raised `UnicodeDecodeError`. Running Python in its standard
UTF-8 mode (`PYTHONUTF8=1`) allowed the unchanged source to complete the audit.

## Behavioral disposition

The mechanical 73-skill and 49-agent output is not shipped. It would preserve
the source runtime's overlapping triggers, static organization chart, model
tiers, tool lists, and automatic shell behavior. The Codex-native disposition
is:

| Source surface | Codex-native destination |
| --- | --- |
| 73 skills | 11 lifecycle skills with non-overlapping trigger boundaries; the complete one-to-one source mapping remains in `CODEX_MIGRATION_PLAN.md` |
| 49 static agents | Temporary role lenses in `references/subagent-roles.md`; Codex subagents are created only for bounded parallel work or independent review |
| Root instructions | Plugin maintenance `AGENTS.md` plus optional root, design, code, and documentation guidance templates |
| Hook scripts | Explicit orientation, evidence checks, package validators, repository CI/protection, and Codex-native collaboration; no install-time hook execution |
| Model, permission, and tool fields | Removed rather than treated as Codex security or routing controls |
| MCP configuration | None added because the audited source defines no MCP servers |
| Scoped rules | General design, evidence, engine, and specialized runtime checks loaded only when relevant; fixed source paths and arbitrary budgets are not copied |
| Status line and session state | Left to Codex and the host application rather than recreated by the plugin |

This follows the current OpenAI plugin migration guidance: preserve portable
skills and resources, convert command or agent procedures into skills where
useful, adapt only supported hooks, and remove Claude-specific live artifacts
or settings from the distributable plugin.

## Gaps closed by this audit

The original port already removed unsupported frontmatter, static subagents,
automatic hooks, MCP/config side effects, and provider-specific runtime terms.
This follow-up added one missing behavior layer:

- `references/specialized-runtime-checks.md` now preserves provider-neutral
  constraints for data/configuration, gameplay and AI, networking, UI and
  accessibility, rendering and shaders, prototypes, and tests.
- Technical design, implementation, code review, and QA load only the relevant
  section and derive thresholds from the actual project.
- Fixed paths, one-engine examples, arbitrary budgets, and source naming rules
  remain intentionally excluded.

## Validation boundary

The official isolated target was validated with `--validate-target`. The
published plugin is additionally checked with Codex plugin validation,
`skill-creator` validation for all 11 skills, runtime residue scanning,
resource-link scanning, routing evaluations, engine detection fixtures, and
unit tests. Passing these checks does not claim that a Unity, Unreal, Godot, or
browser project has been built or played unless separate project evidence is
recorded.

## References

- OpenAI skills repository: `https://github.com/openai/skills/tree/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/migrate-to-codex`
- OpenAI Claude plugin migration guide: `https://developers.openai.com/plugins/guides/submit-claude-plugin`
- OpenAI skill guide: `https://learn.chatgpt.com/docs/build-skills`

