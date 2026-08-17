# Codex Game Studios

[English](README.md) | [简体中文](README.zh-CN.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

![Codex Game Studios 배너](assets/branding/codex-game-studios-banner-minimal.png)

Codex Game Studios는
[`donchitos/claude-code-game-studios`](https://github.com/donchitos/claude-code-game-studios)
를 기반으로 재구성한 Codex 네이티브 게임 개발 프레임워크입니다. 원본 프로젝트의
유용한 게임 개발 흐름은 유지하면서 Claude 전용 역할 체계, 모델 등급, 훅,
명령 전달 구조를 Codex 네이티브 Skill과 명확한 근거 경계로 대체했습니다.

이 플러그인은 게임 콘셉트 구상, 게임 및 기능 설계, 기술 설계, 구현, 디자인 및
코드 리뷰, QA 계획, 플레이테스트 분석, 제작 계획과 전체 개발 조율을 지원합니다.
기술 작업을 시작하기 전에 Unity, Unreal, Godot, 브라우저 또는 식별되지 않은
프로젝트를 판별한 뒤 적절한 엔진 어댑터를 선택합니다.

## 설치

Codex CLI로 마켓플레이스를 추가하고 플러그인을 설치합니다.

```powershell
codex plugin marketplace add DustSaint/codex-game-studios --ref main
codex plugin add codex-game-studios@codex-game-studios
```

설치 후 새 Skill이 검색되도록 새로운 Codex 작업을 시작하세요.

## 사용법

범위가 넓은 게임 개발 작업에서는 조정 Skill을 명시적으로 호출합니다.

```text
$codex-game-studios:manage-game-development
```

### 자주 사용하는 호출

| 호출 | 용도 |
| --- | --- |
| `$codex-game-studios:brainstorm-game-concept` | 게임 콘셉트 구상 |
| `$codex-game-studios:design-game` | 게임 전체 및 시스템 설계 |
| `$codex-game-studios:design-game-feature` | 개별 기능 명세 |
| `$codex-game-studios:write-game-technical-design` | 기술 설계 및 아키텍처 |
| `$codex-game-studios:implement-game-feature` | 기능 구현 |
| `$codex-game-studios:review-game-design` | 게임 디자인 리뷰 |
| `$codex-game-studios:review-game-code` | 게임 코드 리뷰 |
| `$codex-game-studios:plan-game-qa` | QA 계획 |
| `$codex-game-studios:analyze-game-playtests` | 플레이테스트 피드백 분석 |
| `$codex-game-studios:plan-game-production` | 마일스톤 및 제작 계획 |

작업 범위가 충분히 명확하면 자연어로 요청해도 Codex가 적절한 Skill을 자동으로
선택할 수 있습니다.

## 지원 엔진

| 실행 환경 | 지원 방식 |
| --- | --- |
| Unity | 기술 설계, 기능 구현, 코드 리뷰, 엔진 수명 주기 및 검증 지침을 위한 내장 어댑터 |
| Unreal Engine | 기술 설계, 기능 구현, 코드 리뷰, 엔진 수명 주기 및 검증 지침을 위한 내장 어댑터 |
| Godot | 기술 설계, 기능 구현, 코드 리뷰, 엔진 수명 주기 및 검증 지침을 위한 내장 어댑터 |
| 브라우저 게임 | 브라우저 프로젝트를 감지하고 프레임워크별 작업을 설치된 Phaser 2D, Three.js/WebGL 또는 React Three Fiber용 Game Studio Skill로 전달합니다 |
| 알 수 없거나 충돌하는 프로젝트 표식 | 엔진을 추측하지 않고 중립 상태를 유지하며 부족한 프로젝트 근거를 요청합니다 |

게임 콘셉트, 전체 게임 디자인 및 기능 디자인은 엔진 제약이 플레이어에게 보이는
동작을 바꾸지 않는 한 엔진과 독립적으로 진행합니다. 기술 흐름은 프로젝트 파일에서
엔진 버전을 확인하고 해당 버전의 공식 문서에서 불안정한 API를 검증합니다.

## 안전 및 범위

- 설치 과정은 게임 프로젝트를 수정하거나 수명 주기 또는 Shell 훅을 등록하지 않습니다.
- Commit, Push, 배포, 스토어 업로드 및 릴리스 같은 외부 작업에는 사용자의 명시적인
  승인이 필요합니다.
- 추적 가능한 근거가 확보되기 전까지 QA 결과는 `NOT RUN` 상태로 유지되며,
  검증되지 않은 작업을 통과로 보고하지 않습니다.
- 선택적 프로젝트 가이드는 사용자가 요청한 경우에만 복사합니다.
- 브라우저 및 Godot 전문 작업은 사용 가능한 경우 별도로 설치된 공식 또는 전문
  Skill로 전달합니다. 해당 Skill이 없으면 제한 사항을 명시한 대체 흐름을 사용합니다.

## 저장소 구조

- `.agents/plugins/marketplace.json` — Codex 마켓플레이스 매니페스트
- `plugins/codex-game-studios` — 전체 플러그인 패키지
- `plugins/codex-game-studios/docs/CODEX_MIGRATION_PLAN.md` — Codex 마이그레이션 매핑
- `plugins/codex-game-studios/docs/CODEX_PORT_REPORT.md` — 검증 및 보안 보고서

현재 버전은 `0.1.0`입니다. 업스트림 커밋
`984023ddac0d5e27624f2baacde6105e45de375f`를 기반으로 조정되었으며 MIT License로 배포됩니다.
