export const commands = {
  marketplace: "codex plugin marketplace add DustSaint/codex-game-studios --ref main",
  plugin: "codex plugin add codex-game-studios@codex-game-studios",
  coordinator: "$codex-game-studios:manage-game-development",
};

export const skillCommands = [
  "$codex-game-studios:brainstorm-game-concept",
  "$codex-game-studios:design-game",
  "$codex-game-studios:design-game-feature",
  "$codex-game-studios:write-game-technical-design",
  "$codex-game-studios:implement-game-feature",
  "$codex-game-studios:review-game-design",
  "$codex-game-studios:review-game-code",
  "$codex-game-studios:plan-game-qa",
  "$codex-game-studios:analyze-game-playtests",
  "$codex-game-studios:plan-game-production",
];

export const repositoryPaths = [
  ".agents/plugins/marketplace.json",
  "plugins/codex-game-studios",
  "plugins/codex-game-studios/docs/CODEX_MIGRATION_PLAN.md",
  "plugins/codex-game-studios/docs/CODEX_PORT_REPORT.md",
];

// All localized content is versioned here so language switching stays instant,
// dependency-free, and shareable through the canonical ?lang= URL parameter.
export const content = {
  en: {
    metaDescription:
      "Codex Game Studios is a Codex-native framework for game design, implementation, review, QA, playtests, and production planning.",
    languageLabel: "Language",
    githubLabel: "View on GitHub",
    bannerAlt: "Codex Game Studios minimalist transport-network banner",
    eyebrow: "Codex-native game development",
    tagline:
      "A behavior-first framework for turning game ideas into traceable designs, implementations, reviews, QA evidence, playtest learning, and production plans.",
    intro:
      "Adapted from claude-code-game-studios, this plugin removes Claude-specific roles, model tiers, hooks, and command handoffs while preserving the useful game-development lifecycle and evidence discipline.",
    advantagesTitle: "Features and advantages",
    advantagesLead:
      "A practical game-development system for Codex: focused enough for one task, structured enough to carry a project from concept to release planning.",
    advantages: [
      ["Codex-native", "Built around Codex Skills, project evidence, and explicit authorization instead of carrying over Claude-specific runtime machinery."],
      ["Complete lifecycle", "Covers ideation, design, technical planning, implementation, review, QA, playtest analysis, and production planning."],
      ["Evidence before claims", "Keeps assumptions, verified facts, and NOT RUN checks distinct so untested work is never presented as complete."],
      ["Engine-aware", "Detects Unity, Unreal Engine, or Godot project evidence and loads one matching adapter; browser work follows its official specialized workflow."],
      ["Focused or coordinated", "Use one precise Skill for a bounded task, or the coordinator to connect several stages without losing decisions and acceptance criteria."],
      ["Safe by default", "Read-only reviews stay read-only, while commits, deployments, releases, and other external changes require clear user authorization."],
    ],
    startLabel: "Install the plugin",
    repositoryLabel: "Explore the repository",
    installTitle: "Install",
    installLead: "Add the public marketplace, then install the plugin with the Codex CLI.",
    marketplaceCommand: "Add marketplace",
    pluginCommand: "Install plugin",
    installNote: "Start a new Codex task after installation so the new Skills are discovered.",
    useTitle: "How to use",
    useLead:
      "Describe the outcome in natural language and add the Skill name when you want explicit routing. Give Codex the project context, constraints, and definition of done.",
    workflowSteps: [
      ["Open the right project", "Start a new Codex task in the game repository or attach the relevant design, code, logs, screenshots, or playtest evidence."],
      ["Choose the scope", "Use the coordinator for multi-stage work. For one contained deliverable, call the focused Skill listed below."],
      ["State the brief", "Explain the desired outcome, target engine and platform, constraints, existing evidence, and acceptance criteria."],
      ["Review and authorize", "Check the proposed plan or result. Explicitly authorize implementation, commits, deployment, or release only when you want those actions performed."],
    ],
    examplesTitle: "Example requests",
    examplesLead: "Copy the pattern, then replace the project details with your own.",
    usageExamples: [
      ["Full workflow", "$codex-game-studios:manage-game-development", "Plan an inventory feature for this Unity project, write its technical design, implement the smallest vertical slice, and prepare evidence-based QA checks."],
      ["Focused design", "$codex-game-studios:design-game-feature", "Design a stamina system for a third-person action game. Include player decisions, tuning variables, edge cases, and acceptance criteria."],
      ["Review and QA", "$codex-game-studios:review-game-code", "Review the save-system changes in this branch. Prioritize correctness and data-loss risks, cite exact files, and separate verified findings from checks that were not run."],
    ],
    coordinatorCommand: "Coordinate a full workflow",
    skillsTitle: "Focused Skills",
    commandHeading: "Invocation",
    purposeHeading: "Purpose",
    skillPurposes: [
      "Game concept ideation",
      "Whole-game and systems design",
      "Bounded feature specification",
      "Technical design and architecture",
      "Feature implementation",
      "Game-design review",
      "Game-code review",
      "QA planning",
      "Playtest feedback analysis",
      "Milestones and production planning",
    ],
    naturalNote:
      "When the scope is clear, describe the task naturally and Codex can select the matching Skill automatically.",
    enginesTitle: "Supported engines",
    enginesLead:
      "Design work remains engine-agnostic. Technical work detects project evidence before loading one native adapter or routing a browser workflow.",
    engines: [
      ["Unity", "Native adapter for technical design, implementation, code review, lifecycle, and verification guidance."],
      ["Unreal Engine", "Native adapter for technical design, implementation, code review, lifecycle, and verification guidance."],
      ["Godot", "Native adapter for technical design, implementation, code review, lifecycle, and verification guidance."],
      ["Browser games", "Routes framework work to installed Game Studio Skills for Phaser 2D, Three.js/WebGL, or React Three Fiber."],
      ["Unknown or conflicting", "Stays engine-neutral and requests missing project evidence instead of guessing."],
    ],
    safetyTitle: "Safety and evidence",
    safetyItems: [
      "Installation does not edit game projects or register lifecycle or shell hooks.",
      "Commit, push, deployment, store upload, and release require explicit authorization.",
      "QA stays NOT RUN until traceable evidence exists; unverified work is never reported as passed.",
      "Optional project guidance is copied only when the user requests it.",
    ],
    repositoryTitle: "Repository structure",
    repositoryDescriptions: [
      "Codex marketplace manifest",
      "Complete plugin package",
      "Source-to-Codex migration map",
      "Validation and security report",
    ],
    version:
      "Current release: 0.1.0. Adapted from upstream commit 984023ddac0d5e27624f2baacde6105e45de375f and distributed under the MIT License.",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    footer: "Codex Game Studios — a Codex-native game-development framework.",
  },
  "zh-CN": {
    metaDescription:
      "Codex Game Studios 是覆盖游戏设计、实现、评审、QA、试玩分析和制作规划的 Codex 原生框架。",
    languageLabel: "语言",
    githubLabel: "在 GitHub 查看",
    bannerAlt: "Codex Game Studios 极简交通网络横幅",
    eyebrow: "Codex 原生游戏开发",
    tagline:
      "从游戏创意出发，形成可追溯的设计、实现、评审、QA 证据、试玩结论和制作计划。",
    intro:
      "本插件从 claude-code-game-studios 迁移而来，删除 Claude 特有的角色体系、模型分级、钩子和命令交接，同时保留有价值的游戏开发生命周期与证据纪律。",
    advantagesTitle: "特色与优势",
    advantagesLead: "面向 Codex 的实用游戏开发体系：既能处理一个边界明确的任务，也能让项目从创意持续推进到发布规划。",
    advantages: [
      ["Codex 原生", "围绕 Codex Skill、项目证据和明确授权设计，不保留 Claude 特有的运行时结构。"],
      ["覆盖完整生命周期", "涵盖创意、玩法设计、技术方案、实现、评审、QA、试玩分析和制作规划。"],
      ["证据先于结论", "明确区分假设、已验证事实和 NOT RUN 检查，不会把未经测试的工作说成已完成。"],
      ["理解引擎上下文", "根据项目证据识别 Unity、Unreal Engine 或 Godot 并加载一个匹配适配器；浏览器游戏交给官方专用工作流。"],
      ["既可专注也可协同", "边界明确时直接调用一个专用 Skill；跨阶段任务由总协调入口串联，同时保留决策和验收标准。"],
      ["默认安全", "只读评审保持只读；提交、部署、发布及其他外部变更必须先取得用户明确授权。"],
    ],
    startLabel: "安装插件",
    repositoryLabel: "浏览仓库",
    installTitle: "安装",
    installLead: "先添加公开插件市场，再使用 Codex CLI 安装插件。",
    marketplaceCommand: "添加插件市场",
    pluginCommand: "安装插件",
    installNote: "安装完成后请开启新的 Codex 任务，以便发现新安装的 Skill。",
    useTitle: "如何使用",
    useLead: "用自然语言说明目标；需要明确指定路线时，再加上 Skill 名称。同时提供项目背景、限制条件和完成标准。",
    workflowSteps: [
      ["打开正确的项目", "在游戏仓库中开启新的 Codex 任务，或附上相关设计、代码、日志、截图和试玩证据。"],
      ["选择任务范围", "跨多个开发阶段时使用总协调入口；只有一个明确交付物时，直接调用下方专用 Skill。"],
      ["写清任务简报", "说明期望结果、目标引擎与平台、限制条件、已有证据和验收标准。"],
      ["评审并授权", "先检查方案或结果。只有确实希望执行时，才明确授权实现、提交、部署或发布。"],
    ],
    examplesTitle: "使用示例",
    examplesLead: "可以照着以下格式编写，再替换成自己的项目细节。",
    usageExamples: [
      ["完整工作流", "$codex-game-studios:manage-game-development", "为这个 Unity 项目规划背包功能，编写技术设计，实现最小垂直切片，并准备基于证据的 QA 检查。"],
      ["专注功能设计", "$codex-game-studios:design-game-feature", "为第三人称动作游戏设计体力系统，包含玩家决策、调参变量、边界情况和验收标准。"],
      ["代码评审与 QA", "$codex-game-studios:review-game-code", "评审当前分支的存档系统改动，优先检查正确性和数据丢失风险，引用准确文件，并区分已验证结论与未运行检查。"],
    ],
    coordinatorCommand: "协调完整工作流",
    skillsTitle: "专用 Skill",
    commandHeading: "调用",
    purposeHeading: "用途",
    skillPurposes: [
      "游戏创意",
      "整体玩法与系统设计",
      "单个功能规格",
      "技术方案与架构",
      "实现功能",
      "评审设计",
      "评审代码",
      "测试计划",
      "分析试玩反馈",
      "里程碑与制作计划",
    ],
    naturalNote: "需求范围足够明确时，可以直接使用自然语言描述任务，让 Codex 自动选择匹配的 Skill。",
    enginesTitle: "支持的引擎",
    enginesLead: "设计阶段默认保持引擎中立；技术阶段先检查项目证据，再加载一个原生适配器或转交浏览器工作流。",
    engines: [
      ["Unity", "内置原生适配器，覆盖技术设计、实现、代码评审、引擎生命周期和验证指导。"],
      ["Unreal Engine", "内置原生适配器，覆盖技术设计、实现、代码评审、引擎生命周期和验证指导。"],
      ["Godot", "内置原生适配器，覆盖技术设计、实现、代码评审、引擎生命周期和验证指导。"],
      ["浏览器游戏", "将框架相关工作交给已安装的 Phaser 2D、Three.js/WebGL 或 React Three Fiber Game Studio Skill。"],
      ["未知或标记冲突", "保持引擎中立并请求缺失的项目证据，不会猜测引擎。"],
    ],
    safetyTitle: "安全与证据",
    safetyItems: [
      "安装不会修改游戏项目，也不会注册生命周期或 Shell 钩子。",
      "提交、推送、部署、商店上传和发布都需要明确授权。",
      "取得可追溯证据之前，QA 保持 NOT RUN；未验证工作不会被报告为通过。",
      "只有用户明确要求时才会复制可选的项目指导文件。",
    ],
    repositoryTitle: "仓库结构",
    repositoryDescriptions: ["Codex 插件市场清单", "完整插件包", "原项目到 Codex 的迁移映射", "验证与安全报告"],
    version:
      "当前版本：0.1.0。基于上游提交 984023ddac0d5e27624f2baacde6105e45de375f 完成适配，并使用 MIT License 分发。",
    copy: "复制",
    copied: "已复制",
    copyFailed: "复制失败",
    footer: "Codex Game Studios — Codex 原生游戏开发框架。",
  },
  ru: {
    metaDescription:
      "Codex Game Studios — нативный для Codex фреймворк для дизайна, реализации, ревью, QA, плейтестов и производственного планирования.",
    languageLabel: "Язык",
    githubLabel: "Открыть на GitHub",
    bannerAlt: "Минималистичный транспортный баннер Codex Game Studios",
    eyebrow: "Нативная разработка игр в Codex",
    tagline:
      "Превращает игровые идеи в проверяемые дизайны, реализации, ревью, QA-доказательства, выводы плейтестов и производственные планы.",
    intro:
      "Плагин адаптирован из claude-code-game-studios: специфичные для Claude роли, уровни моделей, хуки и передача команд удалены, а полезный жизненный цикл разработки и дисциплина доказательств сохранены.",
    advantagesTitle: "Особенности и преимущества",
    advantagesLead:
      "Практичная система разработки игр для Codex: достаточно точная для отдельной задачи и достаточно структурированная, чтобы вести проект от концепции до планирования релиза.",
    advantages: [
      ["Нативность для Codex", "Построена вокруг Codex Skills, данных проекта и явных разрешений без специфичной для Claude инфраструктуры выполнения."],
      ["Полный жизненный цикл", "Охватывает идеи, дизайн, техническое планирование, реализацию, ревью, QA, анализ плейтестов и планирование производства."],
      ["Сначала доказательства", "Разделяет предположения, проверенные факты и проверки NOT RUN, поэтому непроверенная работа не выдаётся за завершённую."],
      ["Учёт движка", "По данным проекта определяет Unity, Unreal Engine или Godot и загружает один подходящий адаптер; браузерная разработка передаётся официальному специализированному процессу."],
      ["Фокус или координация", "Используйте один точный Skill для ограниченной задачи или координатор для связи нескольких этапов с сохранением решений и критериев приёмки."],
      ["Безопасность по умолчанию", "Ревью остаются только для чтения, а commit, развёртывание, релиз и другие внешние изменения требуют явного разрешения пользователя."],
    ],
    startLabel: "Установить плагин",
    repositoryLabel: "Открыть репозиторий",
    installTitle: "Установка",
    installLead: "Добавьте публичный маркетплейс, затем установите плагин с помощью Codex CLI.",
    marketplaceCommand: "Добавить маркетплейс",
    pluginCommand: "Установить плагин",
    installNote: "После установки начните новую задачу Codex, чтобы новые Skill были обнаружены.",
    useTitle: "Как использовать",
    useLead: "Опишите результат обычным языком и добавьте имя Skill, если нужен явный маршрут. Укажите контекст проекта, ограничения и критерии готовности.",
    workflowSteps: [
      ["Откройте нужный проект", "Начните новую задачу Codex в игровом репозитории или приложите соответствующий дизайн, код, логи, снимки экрана и данные плейтестов."],
      ["Выберите масштаб", "Для многоэтапной работы используйте координатор. Для одного чёткого результата вызовите специализированный Skill из списка ниже."],
      ["Сформулируйте задачу", "Опишите желаемый результат, целевой движок и платформу, ограничения, имеющиеся доказательства и критерии приёмки."],
      ["Проверьте и разрешите", "Проверьте план или результат. Явно разрешайте реализацию, commit, развёртывание или релиз только тогда, когда хотите выполнить эти действия."],
    ],
    examplesTitle: "Примеры запросов",
    examplesLead: "Используйте эти шаблоны и замените сведения о проекте своими.",
    usageExamples: [
      ["Полный процесс", "$codex-game-studios:manage-game-development", "Спланируй систему инвентаря для этого проекта Unity, подготовь технический дизайн, реализуй минимальный вертикальный срез и составь QA-проверки с доказательствами."],
      ["Дизайн функции", "$codex-game-studios:design-game-feature", "Спроектируй систему выносливости для экшена от третьего лица. Включи решения игрока, параметры баланса, граничные случаи и критерии приёмки."],
      ["Ревью и QA", "$codex-game-studios:review-game-code", "Проведи ревью изменений системы сохранений в этой ветке. Сначала проверь корректность и риск потери данных, укажи точные файлы и отдели подтверждённые выводы от невыполненных проверок."],
    ],
    coordinatorCommand: "Координация полного процесса",
    skillsTitle: "Специализированные Skill",
    commandHeading: "Вызов",
    purposeHeading: "Назначение",
    skillPurposes: [
      "Разработка игровой концепции",
      "Целостный дизайн игры и систем",
      "Спецификация отдельной функции",
      "Технический дизайн и архитектура",
      "Реализация функции",
      "Ревью игрового дизайна",
      "Ревью игрового кода",
      "Планирование QA",
      "Анализ отзывов и данных плейтестов",
      "Вехи и производственное планирование",
    ],
    naturalNote: "Если границы задачи ясны, опишите её обычным языком — Codex автоматически выберет подходящий Skill.",
    enginesTitle: "Поддерживаемые движки",
    enginesLead: "Дизайн остаётся независимым от движка. Технический процесс сначала проверяет проект, затем загружает один адаптер или передаёт браузерную работу.",
    engines: [
      ["Unity", "Встроенный адаптер для технического дизайна, реализации, ревью кода, жизненного цикла и верификации."],
      ["Unreal Engine", "Встроенный адаптер для технического дизайна, реализации, ревью кода, жизненного цикла и верификации."],
      ["Godot", "Встроенный адаптер для технического дизайна, реализации, ревью кода, жизненного цикла и верификации."],
      ["Браузерные игры", "Передаёт работу установленным Game Studio Skill для Phaser 2D, Three.js/WebGL или React Three Fiber."],
      ["Неизвестные или противоречивые признаки", "Сохраняет нейтральность и запрашивает недостающие сведения вместо догадок."],
    ],
    safetyTitle: "Безопасность и доказательства",
    safetyItems: [
      "Установка не изменяет игровые проекты и не регистрирует хуки жизненного цикла или оболочки.",
      "Commit, push, развёртывание, загрузка в магазин и релиз требуют явного разрешения.",
      "QA остаётся NOT RUN до появления проверяемых доказательств; непроверенная работа не объявляется успешной.",
      "Дополнительные инструкции проекта копируются только по запросу пользователя.",
    ],
    repositoryTitle: "Структура репозитория",
    repositoryDescriptions: ["Манифест маркетплейса Codex", "Полный пакет плагина", "Карта переноса в Codex", "Отчёт о проверке и безопасности"],
    version:
      "Текущая версия: 0.1.0. Адаптирована из commit 984023ddac0d5e27624f2baacde6105e45de375f и распространяется по лицензии MIT.",
    copy: "Копировать",
    copied: "Скопировано",
    copyFailed: "Ошибка копирования",
    footer: "Codex Game Studios — нативный для Codex фреймворк разработки игр.",
  },
  de: {
    metaDescription:
      "Codex Game Studios ist ein Codex-natives Framework für Spieldesign, Implementierung, Reviews, QA, Playtests und Produktionsplanung.",
    languageLabel: "Sprache",
    githubLabel: "Auf GitHub ansehen",
    bannerAlt: "Minimalistisches Verkehrsnetz-Banner von Codex Game Studios",
    eyebrow: "Codex-native Spieleentwicklung",
    tagline:
      "Verwandelt Spielideen in nachvollziehbare Designs, Implementierungen, Reviews, QA-Evidenz, Playtest-Erkenntnisse und Produktionspläne.",
    intro:
      "Das Plugin wurde aus claude-code-game-studios adaptiert. Claude-spezifische Rollen, Modellstufen, Hooks und Kommandoübergaben wurden entfernt, während der nützliche Entwicklungszyklus und die Evidenzdisziplin erhalten blieben.",
    advantagesTitle: "Merkmale und Vorteile",
    advantagesLead:
      "Ein praxistaugliches Spieleentwicklungssystem für Codex: fokussiert genug für eine einzelne Aufgabe und strukturiert genug, um ein Projekt von der Idee bis zur Release-Planung zu begleiten.",
    advantages: [
      ["Codex-nativ", "Basiert auf Codex Skills, Projektnachweisen und ausdrücklicher Freigabe, ohne Claude-spezifische Laufzeitmechanik zu übernehmen."],
      ["Vollständiger Lebenszyklus", "Deckt Ideenfindung, Design, technische Planung, Implementierung, Reviews, QA, Playtest-Analyse und Produktionsplanung ab."],
      ["Evidenz vor Behauptungen", "Trennt Annahmen, bestätigte Fakten und NOT-RUN-Prüfungen, damit ungeprüfte Arbeit nie als abgeschlossen dargestellt wird."],
      ["Engine-bewusst", "Erkennt Unity-, Unreal-Engine- oder Godot-Projektnachweise und lädt genau einen passenden Adapter; Browser-Arbeit folgt dem offiziellen Spezialablauf."],
      ["Fokussiert oder koordiniert", "Nutze einen präzisen Skill für eine begrenzte Aufgabe oder den Koordinator, um mehrere Phasen mit erhaltenen Entscheidungen und Abnahmekriterien zu verbinden."],
      ["Standardmäßig sicher", "Nur-Lese-Reviews bleiben unverändert; Commits, Deployments, Releases und andere externe Änderungen erfordern eine klare Freigabe."],
    ],
    startLabel: "Plugin installieren",
    repositoryLabel: "Repository öffnen",
    installTitle: "Installation",
    installLead: "Füge den öffentlichen Marketplace hinzu und installiere anschließend das Plugin mit der Codex CLI.",
    marketplaceCommand: "Marketplace hinzufügen",
    pluginCommand: "Plugin installieren",
    installNote: "Starte nach der Installation eine neue Codex-Aufgabe, damit die neuen Skills erkannt werden.",
    useTitle: "So verwendest du das Plugin",
    useLead: "Beschreibe das gewünschte Ergebnis in natürlicher Sprache und ergänze den Skill-Namen, wenn du eine eindeutige Zuordnung möchtest. Nenne Projektkontext, Einschränkungen und Definition of Done.",
    workflowSteps: [
      ["Öffne das richtige Projekt", "Starte eine neue Codex-Aufgabe im Spiele-Repository oder füge relevante Designs, Code, Logs, Screenshots und Playtest-Evidenz bei."],
      ["Bestimme den Umfang", "Nutze den Koordinator für mehrstufige Arbeit. Für ein klar begrenztes Ergebnis rufst du einen spezialisierten Skill aus der Liste auf."],
      ["Formuliere das Briefing", "Beschreibe Ziel, Engine und Plattform, Einschränkungen, vorhandene Evidenz und Abnahmekriterien."],
      ["Prüfe und autorisiere", "Prüfe Plan oder Ergebnis. Autorisiere Implementierung, Commit, Deployment oder Release nur ausdrücklich, wenn diese Aktionen ausgeführt werden sollen."],
    ],
    examplesTitle: "Beispielanfragen",
    examplesLead: "Übernimm das Muster und ersetze die Projektdetails durch deine eigenen.",
    usageExamples: [
      ["Kompletter Ablauf", "$codex-game-studios:manage-game-development", "Plane ein Inventar-Feature für dieses Unity-Projekt, schreibe das technische Design, implementiere einen minimalen Vertical Slice und erstelle evidenzbasierte QA-Prüfungen."],
      ["Fokussiertes Design", "$codex-game-studios:design-game-feature", "Entwirf ein Ausdauersystem für ein Third-Person-Actionspiel. Berücksichtige Spielerentscheidungen, Tuning-Variablen, Grenzfälle und Abnahmekriterien."],
      ["Review und QA", "$codex-game-studios:review-game-code", "Prüfe die Änderungen am Speichersystem in diesem Branch. Priorisiere Korrektheit und Datenverlustrisiken, nenne genaue Dateien und trenne bestätigte Ergebnisse von nicht ausgeführten Prüfungen."],
    ],
    coordinatorCommand: "Vollständigen Ablauf koordinieren",
    skillsTitle: "Spezialisierte Skills",
    commandHeading: "Aufruf",
    purposeHeading: "Zweck",
    skillPurposes: [
      "Entwicklung von Spielkonzepten",
      "Ganzheitliches Spiel- und Systemdesign",
      "Spezifikation eines einzelnen Features",
      "Technisches Design und Architektur",
      "Implementierung eines Features",
      "Review des Spieldesigns",
      "Review des Spielcodes",
      "QA-Planung",
      "Analyse von Playtest-Feedback",
      "Meilenstein- und Produktionsplanung",
    ],
    naturalNote: "Wenn der Umfang eindeutig ist, beschreibe die Aufgabe in natürlicher Sprache; Codex kann den passenden Skill automatisch auswählen.",
    enginesTitle: "Unterstützte Engines",
    enginesLead: "Design bleibt Engine-unabhängig. Technische Arbeit prüft zuerst das Projekt und lädt dann einen Adapter oder übergibt den Browser-Ablauf.",
    engines: [
      ["Unity", "Integrierter Adapter für technisches Design, Implementierung, Code-Review, Lebenszyklus und Validierung."],
      ["Unreal Engine", "Integrierter Adapter für technisches Design, Implementierung, Code-Review, Lebenszyklus und Validierung."],
      ["Godot", "Integrierter Adapter für technisches Design, Implementierung, Code-Review, Lebenszyklus und Validierung."],
      ["Browser-Spiele", "Übergibt Framework-Arbeit an installierte Game Studio Skills für Phaser 2D, Three.js/WebGL oder React Three Fiber."],
      ["Unbekannte oder widersprüchliche Merkmale", "Bleibt Engine-neutral und fordert fehlende Projektnachweise an, statt zu raten."],
    ],
    safetyTitle: "Sicherheit und Evidenz",
    safetyItems: [
      "Die Installation verändert keine Spielprojekte und registriert keine Lifecycle- oder Shell-Hooks.",
      "Commit, Push, Deployment, Store-Upload und Release erfordern eine ausdrückliche Genehmigung.",
      "QA bleibt NOT RUN, bis nachvollziehbare Evidenz vorliegt; ungeprüfte Arbeit wird nie als bestanden gemeldet.",
      "Optionale Projektanweisungen werden nur auf Wunsch kopiert.",
    ],
    repositoryTitle: "Repository-Struktur",
    repositoryDescriptions: ["Codex-Marketplace-Manifest", "Vollständiges Plugin-Paket", "Zuordnung der Codex-Migration", "Validierungs- und Sicherheitsbericht"],
    version:
      "Aktuelle Version: 0.1.0. Basierend auf Upstream-Commit 984023ddac0d5e27624f2baacde6105e45de375f und unter der MIT-Lizenz veröffentlicht.",
    copy: "Kopieren",
    copied: "Kopiert",
    copyFailed: "Kopieren fehlgeschlagen",
    footer: "Codex Game Studios — ein Codex-natives Framework für Spieleentwicklung.",
  },
  ja: {
    metaDescription:
      "Codex Game Studios は、ゲーム設計、実装、レビュー、QA、プレイテスト分析、制作計画を支援する Codex ネイティブフレームワークです。",
    languageLabel: "言語",
    githubLabel: "GitHub で見る",
    bannerAlt: "Codex Game Studios のミニマルな交通ネットワーク風バナー",
    eyebrow: "Codex ネイティブのゲーム開発",
    tagline:
      "ゲームのアイデアを、追跡可能な設計、実装、レビュー、QA エビデンス、プレイテストの学び、制作計画へつなげます。",
    intro:
      "claude-code-game-studios を基に再構築し、Claude 固有のロール、モデル階層、フック、コマンド引き継ぎを削除しました。有用な開発ライフサイクルとエビデンス規律は維持しています。",
    advantagesTitle: "特徴とメリット",
    advantagesLead:
      "Codex のための実用的なゲーム開発システムです。単一タスクには十分に集中でき、コンセプトからリリース計画までプロジェクトを支える構造も備えています。",
    advantages: [
      ["Codex ネイティブ", "Claude 固有の実行機構を残さず、Codex Skills、プロジェクトのエビデンス、明示的な許可を中心に設計しています。"],
      ["開発ライフサイクル全体", "アイデア、設計、技術計画、実装、レビュー、QA、プレイテスト分析、制作計画を一貫して扱います。"],
      ["主張よりエビデンス", "仮定、検証済みの事実、NOT RUN の確認事項を分け、未検証の作業を完了済みとして扱いません。"],
      ["エンジンを認識", "プロジェクトの情報から Unity、Unreal Engine、Godot を判定して 1 つの適切なアダプターを読み込み、ブラウザ開発は公式の専門フローへ渡します。"],
      ["集中と連携の両立", "限定された作業には 1 つの専門 Skill、複数工程にはコーディネーターを使い、判断と受け入れ基準を維持します。"],
      ["安全な初期動作", "読み取り専用レビューは変更を加えず、Commit、デプロイ、リリースなどの外部変更には明示的な許可を求めます。"],
    ],
    startLabel: "プラグインをインストール",
    repositoryLabel: "リポジトリを見る",
    installTitle: "インストール",
    installLead: "公開マーケットプレイスを追加してから、Codex CLI でプラグインをインストールします。",
    marketplaceCommand: "マーケットプレイスを追加",
    pluginCommand: "プラグインをインストール",
    installNote: "インストール後、新しい Skill を認識させるために新しい Codex タスクを開始してください。",
    useTitle: "使い方",
    useLead: "目的を自然言語で説明し、経路を明示したい場合は Skill 名を加えます。プロジェクトの背景、制約、完了条件も伝えてください。",
    workflowSteps: [
      ["適切なプロジェクトを開く", "ゲームのリポジトリで新しい Codex タスクを開始するか、関連する設計、コード、ログ、スクリーンショット、プレイテストのエビデンスを添付します。"],
      ["作業範囲を選ぶ", "複数工程にまたがる作業ではコーディネーターを使い、1 つの明確な成果物には下記の専門 Skill を呼び出します。"],
      ["依頼内容を明確にする", "期待する結果、対象エンジンとプラットフォーム、制約、既存のエビデンス、受け入れ基準を説明します。"],
      ["確認して許可する", "提案された計画または結果を確認し、実装、Commit、デプロイ、リリースを本当に行う場合にのみ明示的に許可します。"],
    ],
    examplesTitle: "依頼の例",
    examplesLead: "次の形式をコピーし、プロジェクト固有の内容に置き換えてください。",
    usageExamples: [
      ["開発フロー全体", "$codex-game-studios:manage-game-development", "この Unity プロジェクトのインベントリ機能を計画し、技術設計を書き、最小のバーティカルスライスを実装して、エビデンスに基づく QA チェックを準備してください。"],
      ["機能設計", "$codex-game-studios:design-game-feature", "三人称アクションゲームのスタミナシステムを設計してください。プレイヤーの判断、調整変数、境界ケース、受け入れ基準を含めてください。"],
      ["レビューと QA", "$codex-game-studios:review-game-code", "このブランチのセーブシステム変更をレビューしてください。正確性とデータ損失リスクを優先し、該当ファイルを明記し、確認済みの指摘と未実行のチェックを分けてください。"],
    ],
    coordinatorCommand: "開発フロー全体を調整",
    skillsTitle: "専門 Skill",
    commandHeading: "呼び出し",
    purposeHeading: "用途",
    skillPurposes: [
      "ゲームコンセプトの発想",
      "ゲーム全体とシステムの設計",
      "単一機能の仕様策定",
      "技術設計とアーキテクチャ",
      "機能実装",
      "ゲームデザインレビュー",
      "ゲームコードレビュー",
      "QA 計画",
      "プレイテスト結果の分析",
      "マイルストーンと制作計画",
    ],
    naturalNote: "作業範囲が明確であれば、自然言語で依頼するだけで Codex が適切な Skill を自動選択できます。",
    enginesTitle: "対応エンジン",
    enginesLead: "設計は原則としてエンジン非依存です。技術作業ではプロジェクトを確認してから、1 つのアダプターを読み込むかブラウザフローへ引き継ぎます。",
    engines: [
      ["Unity", "技術設計、実装、コードレビュー、ライフサイクル、検証指針に対応する内蔵アダプター。"],
      ["Unreal Engine", "技術設計、実装、コードレビュー、ライフサイクル、検証指針に対応する内蔵アダプター。"],
      ["Godot", "技術設計、実装、コードレビュー、ライフサイクル、検証指針に対応する内蔵アダプター。"],
      ["ブラウザゲーム", "Phaser 2D、Three.js/WebGL、React Three Fiber 用のインストール済み Game Studio Skill に引き継ぎます。"],
      ["不明または矛盾するマーカー", "エンジンを推測せず、中立な状態で不足しているプロジェクト情報を確認します。"],
    ],
    safetyTitle: "安全性とエビデンス",
    safetyItems: [
      "インストールはゲームプロジェクトを変更せず、ライフサイクルまたは Shell フックを登録しません。",
      "Commit、Push、デプロイ、ストアへのアップロード、リリースには明示的な許可が必要です。",
      "追跡可能なエビデンスが得られるまで QA は NOT RUN のままです。未検証の作業を合格として報告しません。",
      "オプションのプロジェクトガイダンスは、ユーザーが要求した場合にのみコピーします。",
    ],
    repositoryTitle: "リポジトリ構成",
    repositoryDescriptions: ["Codex マーケットプレイスマニフェスト", "完全なプラグインパッケージ", "Codex への移行マッピング", "検証およびセキュリティレポート"],
    version:
      "現在のバージョン：0.1.0。上流コミット 984023ddac0d5e27624f2baacde6105e45de375f を基に適応し、MIT License で配布しています。",
    copy: "コピー",
    copied: "コピーしました",
    copyFailed: "コピーできませんでした",
    footer: "Codex Game Studios — Codex ネイティブのゲーム開発フレームワーク。",
  },
  ko: {
    metaDescription:
      "Codex Game Studios는 게임 디자인, 구현, 리뷰, QA, 플레이테스트 분석 및 제작 계획을 지원하는 Codex 네이티브 프레임워크입니다.",
    languageLabel: "언어",
    githubLabel: "GitHub에서 보기",
    bannerAlt: "Codex Game Studios 미니멀 교통 네트워크 배너",
    eyebrow: "Codex 네이티브 게임 개발",
    tagline:
      "게임 아이디어를 추적 가능한 디자인, 구현, 리뷰, QA 근거, 플레이테스트 학습 및 제작 계획으로 연결합니다.",
    intro:
      "claude-code-game-studios를 기반으로 재구성했으며 Claude 전용 역할 체계, 모델 등급, 훅 및 명령 전달 구조는 제거했습니다. 유용한 개발 수명 주기와 근거 원칙은 유지합니다.",
    advantagesTitle: "특징과 장점",
    advantagesLead:
      "Codex를 위한 실용적인 게임 개발 시스템입니다. 하나의 작업에 집중할 수 있고, 콘셉트부터 출시 계획까지 프로젝트를 이어 갈 수 있도록 구조화되어 있습니다.",
    advantages: [
      ["Codex 네이티브", "Claude 전용 실행 구조를 유지하지 않고 Codex Skills, 프로젝트 근거, 명시적 승인을 중심으로 설계했습니다."],
      ["전체 개발 수명 주기", "아이디어, 디자인, 기술 계획, 구현, 리뷰, QA, 플레이테스트 분석 및 제작 계획을 모두 다룹니다."],
      ["주장보다 근거", "가정, 검증된 사실, NOT RUN 검사를 구분하여 테스트하지 않은 작업을 완료된 것으로 표현하지 않습니다."],
      ["엔진 인식", "프로젝트 근거로 Unity, Unreal Engine 또는 Godot를 판별하고 하나의 적합한 어댑터를 로드하며, 브라우저 작업은 공식 전문 흐름으로 전달합니다."],
      ["집중 또는 조정", "범위가 명확한 작업에는 하나의 전문 Skill을 사용하고, 여러 단계에는 조정 Skill을 사용하여 결정과 인수 기준을 유지합니다."],
      ["기본적으로 안전", "읽기 전용 리뷰는 변경하지 않으며 Commit, 배포, 릴리스 및 기타 외부 변경에는 명확한 사용자 승인이 필요합니다."],
    ],
    startLabel: "플러그인 설치",
    repositoryLabel: "저장소 보기",
    installTitle: "설치",
    installLead: "공개 마켓플레이스를 추가한 다음 Codex CLI로 플러그인을 설치합니다.",
    marketplaceCommand: "마켓플레이스 추가",
    pluginCommand: "플러그인 설치",
    installNote: "설치 후 새 Skill이 검색되도록 새로운 Codex 작업을 시작하세요.",
    useTitle: "사용 방법",
    useLead: "원하는 결과를 자연어로 설명하고, 명시적으로 연결하고 싶을 때 Skill 이름을 추가하세요. 프로젝트 배경, 제약 조건 및 완료 기준도 제공하세요.",
    workflowSteps: [
      ["올바른 프로젝트 열기", "게임 저장소에서 새 Codex 작업을 시작하거나 관련 디자인, 코드, 로그, 스크린샷 및 플레이테스트 근거를 첨부합니다."],
      ["작업 범위 선택", "여러 단계에 걸친 작업에는 조정 Skill을 사용합니다. 하나의 명확한 결과물에는 아래 전문 Skill을 호출합니다."],
      ["요청 내용 작성", "원하는 결과, 대상 엔진과 플랫폼, 제약 조건, 기존 근거 및 인수 기준을 설명합니다."],
      ["검토 후 승인", "제안된 계획이나 결과를 확인합니다. 실제 수행을 원할 때만 구현, Commit, 배포 또는 릴리스를 명시적으로 승인합니다."],
    ],
    examplesTitle: "요청 예시",
    examplesLead: "아래 형식을 복사한 뒤 자신의 프로젝트 세부 정보로 바꾸세요.",
    usageExamples: [
      ["전체 작업 흐름", "$codex-game-studios:manage-game-development", "이 Unity 프로젝트의 인벤토리 기능을 계획하고, 기술 설계를 작성하고, 최소 버티컬 슬라이스를 구현한 뒤 근거 기반 QA 검사를 준비해 주세요."],
      ["기능 디자인", "$codex-game-studios:design-game-feature", "3인칭 액션 게임의 스태미나 시스템을 디자인해 주세요. 플레이어 선택, 튜닝 변수, 경계 사례 및 인수 기준을 포함해 주세요."],
      ["리뷰와 QA", "$codex-game-studios:review-game-code", "이 브랜치의 저장 시스템 변경 사항을 리뷰해 주세요. 정확성과 데이터 손실 위험을 우선하고, 정확한 파일을 인용하며, 검증된 결과와 실행하지 않은 검사를 구분해 주세요."],
    ],
    coordinatorCommand: "전체 개발 흐름 조정",
    skillsTitle: "전문 Skill",
    commandHeading: "호출",
    purposeHeading: "용도",
    skillPurposes: [
      "게임 콘셉트 구상",
      "게임 전체 및 시스템 설계",
      "개별 기능 명세",
      "기술 설계 및 아키텍처",
      "기능 구현",
      "게임 디자인 리뷰",
      "게임 코드 리뷰",
      "QA 계획",
      "플레이테스트 피드백 분석",
      "마일스톤 및 제작 계획",
    ],
    naturalNote: "작업 범위가 명확하면 자연어로 요청해도 Codex가 적절한 Skill을 자동으로 선택할 수 있습니다.",
    enginesTitle: "지원 엔진",
    enginesLead: "디자인은 기본적으로 엔진과 독립적입니다. 기술 작업은 프로젝트 근거를 확인한 뒤 하나의 어댑터를 로드하거나 브라우저 흐름으로 전달합니다.",
    engines: [
      ["Unity", "기술 설계, 구현, 코드 리뷰, 엔진 수명 주기 및 검증 지침을 위한 내장 어댑터."],
      ["Unreal Engine", "기술 설계, 구현, 코드 리뷰, 엔진 수명 주기 및 검증 지침을 위한 내장 어댑터."],
      ["Godot", "기술 설계, 구현, 코드 리뷰, 엔진 수명 주기 및 검증 지침을 위한 내장 어댑터."],
      ["브라우저 게임", "Phaser 2D, Three.js/WebGL 또는 React Three Fiber용 Game Studio Skill로 전달합니다."],
      ["알 수 없거나 충돌하는 표식", "엔진을 추측하지 않고 중립 상태에서 부족한 프로젝트 근거를 요청합니다."],
    ],
    safetyTitle: "안전 및 근거",
    safetyItems: [
      "설치는 게임 프로젝트를 수정하거나 수명 주기 또는 Shell 훅을 등록하지 않습니다.",
      "Commit, Push, 배포, 스토어 업로드 및 릴리스에는 명시적인 승인이 필요합니다.",
      "추적 가능한 근거가 확보될 때까지 QA는 NOT RUN 상태이며, 검증되지 않은 작업을 통과로 보고하지 않습니다.",
      "선택적 프로젝트 가이드는 사용자가 요청한 경우에만 복사합니다.",
    ],
    repositoryTitle: "저장소 구조",
    repositoryDescriptions: ["Codex 마켓플레이스 매니페스트", "전체 플러그인 패키지", "Codex 마이그레이션 매핑", "검증 및 보안 보고서"],
    version:
      "현재 버전: 0.1.0. 업스트림 커밋 984023ddac0d5e27624f2baacde6105e45de375f를 기반으로 조정되었으며 MIT License로 배포됩니다.",
    copy: "복사",
    copied: "복사됨",
    copyFailed: "복사 실패",
    footer: "Codex Game Studios — Codex 네이티브 게임 개발 프레임워크.",
  },
};

const localeAliases = {
  zh: "zh-CN",
  "zh-cn": "zh-CN",
  "zh-sg": "zh-CN",
  ru: "ru",
  de: "de",
  ja: "ja",
  ko: "ko",
};

function resolveLocale() {
  const requested = new URL(window.location.href).searchParams.get("lang");
  if (requested && content[requested]) return requested;

  for (const browserLocale of navigator.languages ?? [navigator.language]) {
    const normalized = browserLocale.toLowerCase();
    if (localeAliases[normalized]) return localeAliases[normalized];
    const primary = normalized.split("-")[0];
    if (localeAliases[primary]) return localeAliases[primary];
  }

  return "en";
}

function commandCard(label, key) {
  return `
    <article class="command-card">
      <p class="command-label">${label}</p>
      <pre><code>${commands[key]}</code></pre>
      <button class="copy-button" type="button" data-copy-key="${key}">Copy</button>
    </article>
  `;
}

function render(locale) {
  const strings = content[locale];
  const main = document.querySelector("#main-content");

  document.documentElement.lang = locale;
  document.title = `Codex Game Studios — ${strings.eyebrow}`;
  document.querySelector('meta[name="description"]').content = strings.metaDescription;
  document.querySelector("#language-label").textContent = strings.languageLabel;
  document.querySelector("#language-select").value = locale;
  document.querySelector("#language-select").ariaLabel = strings.languageLabel;
  document.querySelector("#github-label").textContent = strings.githubLabel;

  document.querySelectorAll("[data-locale-link]").forEach((link) => {
    if (link.dataset.localeLink === locale) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const skillRows = skillCommands
    .map(
      (command, index) => `
        <tr>
          <td><code>${command}</code></td>
          <td>${strings.skillPurposes[index]}</td>
        </tr>
      `,
    )
    .join("");

  const engineCards = strings.engines
    .map(
      ([name, description]) => `
        <article class="engine-card">
          <h3>${name}</h3>
          <p>${description}</p>
        </article>
      `,
    )
    .join("");

  const advantageCards = strings.advantages
    .map(
      ([title, description], index) => `
        <article class="advantage-card">
          <span class="card-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          <h3>${title}</h3>
          <p>${description}</p>
        </article>
      `,
    )
    .join("");

  const workflowSteps = strings.workflowSteps
    .map(
      ([title, description], index) => `
        <li class="workflow-step">
          <span class="step-number" aria-hidden="true">${index + 1}</span>
          <div>
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        </li>
      `,
    )
    .join("");

  const usageExamples = strings.usageExamples
    .map(
      ([title, skill, prompt]) => `
        <article class="example-card">
          <p class="example-label">${title}</p>
          <code>${skill}</code>
          <p class="example-prompt">“${prompt}”</p>
        </article>
      `,
    )
    .join("");

  const safetyItems = strings.safetyItems.map((item) => `<li>${item}</li>`).join("");
  const repositoryItems = repositoryPaths
    .map(
      (path, index) => `
        <li><code>${path}</code> — ${strings.repositoryDescriptions[index]}</li>
      `,
    )
    .join("");

  main.innerHTML = `
    <section class="hero">
      <img
        class="hero-image"
        src="./assets/codex-game-studios-banner-minimal.png"
        alt="${strings.bannerAlt}"
      >
      <div class="hero-copy">
        <p class="eyebrow">${strings.eyebrow}</p>
        <h1>Codex Game Studios</h1>
        <p class="hero-intro">${strings.tagline}</p>
        <p class="hero-intro">${strings.intro}</p>
        <div class="hero-actions">
          <a class="primary-link" href="#install">${strings.startLabel}</a>
          <a
            class="secondary-link"
            href="https://github.com/DustSaint/codex-game-studios"
            rel="noreferrer"
          >${strings.repositoryLabel}</a>
        </div>
      </div>
    </section>

    <section class="panel">
      <h2>${strings.advantagesTitle}</h2>
      <p class="section-lead">${strings.advantagesLead}</p>
      <div class="advantage-grid">${advantageCards}</div>
    </section>

    <section id="install" class="panel">
      <h2>${strings.installTitle}</h2>
      <p class="section-lead">${strings.installLead}</p>
      <div class="command-grid">
        ${commandCard(strings.marketplaceCommand, "marketplace")}
        ${commandCard(strings.pluginCommand, "plugin")}
      </div>
      <p class="note">${strings.installNote}</p>
    </section>

    <section class="panel">
      <h2>${strings.useTitle}</h2>
      <p class="section-lead">${strings.useLead}</p>
      <ol class="workflow-list">${workflowSteps}</ol>
      <div class="command-grid">
        ${commandCard(strings.coordinatorCommand, "coordinator")}
      </div>
      <h3>${strings.examplesTitle}</h3>
      <p class="section-lead section-lead-compact">${strings.examplesLead}</p>
      <div class="example-grid">${usageExamples}</div>
      <h3>${strings.skillsTitle}</h3>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>${strings.commandHeading}</th>
              <th>${strings.purposeHeading}</th>
            </tr>
          </thead>
          <tbody>${skillRows}</tbody>
        </table>
      </div>
      <p class="note">${strings.naturalNote}</p>
    </section>

    <section class="panel">
      <h2>${strings.enginesTitle}</h2>
      <p class="section-lead">${strings.enginesLead}</p>
      <div class="engine-grid">${engineCards}</div>
    </section>

    <section class="panel">
      <h2>${strings.safetyTitle}</h2>
      <ul class="safety-list">${safetyItems}</ul>
    </section>

    <section class="panel">
      <h2>${strings.repositoryTitle}</h2>
      <ul class="repo-list">${repositoryItems}</ul>
      <p class="note">${strings.version}</p>
    </section>

    <footer class="site-footer">${strings.footer}</footer>
  `;

  main.querySelectorAll("[data-copy-key]").forEach((button) => {
    button.textContent = strings.copy;
    button.addEventListener("click", async () => {
      const command = commands[button.dataset.copyKey];
      try {
        await navigator.clipboard.writeText(command);
        button.textContent = strings.copied;
      } catch (error) {
        button.textContent = strings.copyFailed;
        console.error("Unable to copy Codex command", error);
      }

      window.setTimeout(() => {
        button.textContent = strings.copy;
      }, 1800);
    });
  });
}

// The guard keeps localization data importable by the repository validator
// without pretending that Node provides a browser DOM.
if (typeof document !== "undefined") {
  const locale = resolveLocale();
  render(locale);

  document.querySelector("#language-select").addEventListener("change", (event) => {
    const nextLocale = event.target.value;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState(null, "", url);
    render(nextLocale);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
