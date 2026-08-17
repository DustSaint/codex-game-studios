# Codex Game Studios

Codex Game Studios is a Codex-native game-development framework adapted from
[`donchitos/claude-code-game-studios`](https://github.com/donchitos/claude-code-game-studios).
It preserves the useful game-development behavior while replacing Claude-specific
roles, model tiers, hooks, and command handoffs with native Codex skills and explicit
evidence boundaries.

The plugin supports concept discovery, game and feature design, technical design,
implementation, design and code review, QA planning, playtest analysis, production
planning, and end-to-end workflow coordination. Technical work detects Unity,
Unreal, Godot, browser, or unknown projects before selecting an engine adapter.

## Install

Install the marketplace and plugin with the Codex CLI:

```powershell
codex plugin marketplace add DustSaint/codex-game-studios --ref main
codex plugin add codex-game-studios@codex-game-studios
```

Start a new Codex task after installation so the new skills are discovered.

## Use

For broad game-development work, call the coordinator explicitly:

```text
$codex-game-studios:manage-game-development
```

### 常用调用 / Common Invocations

| 调用 / Invocation | 中文说明 | English description |
| --- | --- | --- |
| `$codex-game-studios:brainstorm-game-concept` | 游戏创意 | Game concept ideation |
| `$codex-game-studios:design-game` | 整体玩法与系统设计 | Whole-game and systems design |
| `$codex-game-studios:design-game-feature` | 单个功能规格 | Bounded feature specification |
| `$codex-game-studios:write-game-technical-design` | 技术方案与架构 | Technical design and architecture |
| `$codex-game-studios:implement-game-feature` | 实现功能 | Feature implementation |
| `$codex-game-studios:review-game-design` | 评审设计 | Game-design review |
| `$codex-game-studios:review-game-code` | 评审代码 | Game-code review |
| `$codex-game-studios:plan-game-qa` | 测试计划 | QA planning |
| `$codex-game-studios:analyze-game-playtests` | 分析试玩反馈 | Playtest feedback analysis |
| `$codex-game-studios:plan-game-production` | 里程碑与制作计划 | Milestones and production planning |

Natural-language requests can trigger the matching skill automatically when its
scope is clear.

## Safety model

- Installation does not edit game projects or register lifecycle hooks.
- External actions such as commit, push, deployment, store upload, and release
  require explicit authorization.
- QA results remain `NOT RUN` until evidence exists; unverified work is never
  reported as passed.
- Optional project guidance is copied only when requested.
- Browser and Godot specialist work is handed to separately installed official or
  specialist skills when available, with a graceful fallback when absent.

## Repository layout

- `.agents/plugins/marketplace.json` — Codex marketplace manifest
- `plugins/codex-game-studios` — complete plugin package
- `plugins/codex-game-studios/docs/CODEX_MIGRATION_PLAN.md` — source-to-Codex mapping
- `plugins/codex-game-studios/docs/CODEX_PORT_REPORT.md` — validation and security report

The current release is `0.1.0`, adapted from upstream commit
`984023ddac0d5e27624f2baacde6105e45de375f` and distributed under the MIT License.
