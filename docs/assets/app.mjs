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
    startLabel: "Install the plugin",
    repositoryLabel: "Explore the repository",
    installTitle: "Install",
    installLead: "Add the public marketplace, then install the plugin with the Codex CLI.",
    marketplaceCommand: "Add marketplace",
    pluginCommand: "Install plugin",
    installNote: "Start a new Codex task after installation so the new Skills are discovered.",
    useTitle: "Use",
    useLead:
      "Call the coordinator for broad game-development work, or invoke a focused Skill for a bounded task.",
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
    startLabel: "安装插件",
    repositoryLabel: "浏览仓库",
    installTitle: "安装",
    installLead: "先添加公开插件市场，再使用 Codex CLI 安装插件。",
    marketplaceCommand: "添加插件市场",
    pluginCommand: "安装插件",
    installNote: "安装完成后请开启新的 Codex 任务，以便发现新安装的 Skill。",
    useTitle: "使用",
    useLead: "范围较广的游戏开发任务使用总协调入口；边界明确的任务可以直接调用专用 Skill。",
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
    startLabel: "Установить плагин",
    repositoryLabel: "Открыть репозиторий",
    installTitle: "Установка",
    installLead: "Добавьте публичный маркетплейс, затем установите плагин с помощью Codex CLI.",
    marketplaceCommand: "Добавить маркетплейс",
    pluginCommand: "Установить плагин",
    installNote: "После установки начните новую задачу Codex, чтобы новые Skill были обнаружены.",
    useTitle: "Использование",
    useLead: "Для широких задач вызывайте координатор, а для ограниченной задачи — специализированный Skill.",
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
    startLabel: "Plugin installieren",
    repositoryLabel: "Repository öffnen",
    installTitle: "Installation",
    installLead: "Füge den öffentlichen Marketplace hinzu und installiere anschließend das Plugin mit der Codex CLI.",
    marketplaceCommand: "Marketplace hinzufügen",
    pluginCommand: "Plugin installieren",
    installNote: "Starte nach der Installation eine neue Codex-Aufgabe, damit die neuen Skills erkannt werden.",
    useTitle: "Verwendung",
    useLead: "Nutze den Koordinator für umfangreiche Entwicklungsarbeit oder einen spezialisierten Skill für eine klar begrenzte Aufgabe.",
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
    startLabel: "プラグインをインストール",
    repositoryLabel: "リポジトリを見る",
    installTitle: "インストール",
    installLead: "公開マーケットプレイスを追加してから、Codex CLI でプラグインをインストールします。",
    marketplaceCommand: "マーケットプレイスを追加",
    pluginCommand: "プラグインをインストール",
    installNote: "インストール後、新しい Skill を認識させるために新しい Codex タスクを開始してください。",
    useTitle: "使い方",
    useLead: "範囲の広い開発作業にはコーディネーターを使い、明確に限定された作業には専門 Skill を直接使います。",
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
    startLabel: "플러그인 설치",
    repositoryLabel: "저장소 보기",
    installTitle: "설치",
    installLead: "공개 마켓플레이스를 추가한 다음 Codex CLI로 플러그인을 설치합니다.",
    marketplaceCommand: "마켓플레이스 추가",
    pluginCommand: "플러그인 설치",
    installNote: "설치 후 새 Skill이 검색되도록 새로운 Codex 작업을 시작하세요.",
    useTitle: "사용법",
    useLead: "범위가 넓은 개발 작업에는 조정 Skill을 사용하고, 경계가 명확한 작업에는 전문 Skill을 직접 호출합니다.",
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
      <div class="command-grid">
        ${commandCard(strings.coordinatorCommand, "coordinator")}
      </div>
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
