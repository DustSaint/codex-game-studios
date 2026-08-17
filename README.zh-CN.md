# Codex Game Studios

[English](README.md) | [简体中文](README.zh-CN.md)

Codex Game Studios 是一个从
[`donchitos/claude-code-game-studios`](https://github.com/donchitos/claude-code-game-studios)
迁移而来的 Codex 原生游戏开发框架。它保留了原项目中有价值的游戏开发行为，
同时用 Codex 原生 Skill 和明确的证据边界替换了 Claude 特有的角色体系、模型分级、
生命周期钩子与命令交接机制。

该插件覆盖游戏创意、整体与功能设计、技术设计、功能实现、设计与代码评审、
QA 规划、试玩分析、制作规划以及端到端开发协调。进入技术阶段时，它会先识别
Unity、Unreal、Godot、浏览器或未知项目，再选择相应的引擎适配流程。

## 安装

使用 Codex CLI 添加插件市场并安装插件：

```powershell
codex plugin marketplace add DustSaint/codex-game-studios --ref main
codex plugin add codex-game-studios@codex-game-studios
```

安装完成后，请开启一个新的 Codex 任务，以便 Codex 发现新安装的 Skill。

## 使用

处理范围较广的游戏开发任务时，可以显式调用总协调入口：

```text
$codex-game-studios:manage-game-development
```

### 常用调用

| 调用 | 用途 |
| --- | --- |
| `$codex-game-studios:brainstorm-game-concept` | 游戏创意 |
| `$codex-game-studios:design-game` | 整体玩法与系统设计 |
| `$codex-game-studios:design-game-feature` | 单个功能规格 |
| `$codex-game-studios:write-game-technical-design` | 技术方案与架构 |
| `$codex-game-studios:implement-game-feature` | 实现功能 |
| `$codex-game-studios:review-game-design` | 评审设计 |
| `$codex-game-studios:review-game-code` | 评审代码 |
| `$codex-game-studios:plan-game-qa` | 测试计划 |
| `$codex-game-studios:analyze-game-playtests` | 分析试玩反馈 |
| `$codex-game-studios:plan-game-production` | 里程碑与制作计划 |

当需求范围足够明确时，也可以直接使用自然语言描述任务，让 Codex 自动选择匹配的 Skill。

## 安全与范围

- 安装插件不会修改游戏项目，也不会注册生命周期或 Shell 钩子。
- 提交、推送、部署、商店上传和发布等外部操作都需要用户明确授权。
- 在取得可追溯证据之前，QA 结果保持为 `NOT RUN`；未验证的工作不会被报告为通过。
- 只有在用户明确要求时，才会复制可选的项目指导文件。
- 浏览器和 Godot 的专门工作会在相应 Skill 可用时交给独立安装的官方或专业 Skill；
  如果对应 Skill 不存在，则采用明确说明限制的降级流程。

## 仓库结构

- `.agents/plugins/marketplace.json` — Codex 插件市场清单
- `plugins/codex-game-studios` — 完整插件包
- `plugins/codex-game-studios/docs/CODEX_MIGRATION_PLAN.md` — 原项目到 Codex 的迁移映射
- `plugins/codex-game-studios/docs/CODEX_PORT_REPORT.md` — 验证与安全报告

当前版本为 `0.1.0`，基于上游提交
`984023ddac0d5e27624f2baacde6105e45de375f` 完成适配，并使用 MIT License 分发。
