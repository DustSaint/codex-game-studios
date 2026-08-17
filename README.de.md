# Codex Game Studios

[English](README.md) | [简体中文](README.zh-CN.md) | [Русский](README.ru.md) | [Deutsch](README.de.md) | [日本語](README.ja.md) | [한국어](README.ko.md)

![Codex Game Studios Banner](assets/branding/codex-game-studios-banner-minimal.png)

Codex Game Studios ist ein Codex-natives Framework für die Spieleentwicklung,
das aus
[`donchitos/claude-code-game-studios`](https://github.com/donchitos/claude-code-game-studios)
adaptiert wurde. Es bewahrt die nützlichen Abläufe der Spieleentwicklung und
ersetzt Claude-spezifische Rollen, Modellstufen, Hooks und Kommandoübergaben
durch native Codex Skills und klar definierte Evidenzgrenzen.

Das Plugin unterstützt Konzeptentwicklung, Spiel- und Feature-Design, technische
Konzeption, Implementierung, Design- und Code-Reviews, QA-Planung,
Playtest-Analyse, Produktionsplanung und die durchgängige Koordination der
Entwicklung. Vor technischen Arbeiten erkennt es Unity-, Unreal-, Godot-,
Browser- oder unbekannte Projekte und wählt erst danach den passenden
Engine-Adapter.

## Installation

Marketplace und Plugin werden mit der Codex CLI installiert:

```powershell
codex plugin marketplace add DustSaint/codex-game-studios --ref main
codex plugin add codex-game-studios@codex-game-studios
```

Starte nach der Installation eine neue Codex-Aufgabe, damit die neuen Skills
erkannt werden.

## Verwendung

Für umfangreiche Aufgaben in der Spieleentwicklung wird der Koordinator explizit
aufgerufen:

```text
$codex-game-studios:manage-game-development
```

### Häufige Aufrufe

| Aufruf | Zweck |
| --- | --- |
| `$codex-game-studios:brainstorm-game-concept` | Entwicklung von Spielkonzepten |
| `$codex-game-studios:design-game` | Ganzheitliches Spiel- und Systemdesign |
| `$codex-game-studios:design-game-feature` | Spezifikation eines einzelnen Features |
| `$codex-game-studios:write-game-technical-design` | Technisches Design und Architektur |
| `$codex-game-studios:implement-game-feature` | Implementierung eines Features |
| `$codex-game-studios:review-game-design` | Review des Spieldesigns |
| `$codex-game-studios:review-game-code` | Review des Spielcodes |
| `$codex-game-studios:plan-game-qa` | QA-Planung |
| `$codex-game-studios:analyze-game-playtests` | Analyse von Playtest-Feedback |
| `$codex-game-studios:plan-game-production` | Meilenstein- und Produktionsplanung |

Wenn der Aufgabenbereich eindeutig ist, kann die Aufgabe auch in natürlicher
Sprache beschrieben werden; Codex wählt dann automatisch den passenden Skill.

## Unterstützte Engines

| Laufzeitumgebung | Unterstützung |
| --- | --- |
| Unity | Integrierter Adapter für technisches Design, Feature-Implementierung, Code-Review, Engine-Lebenszyklus und Validierungsrichtlinien |
| Unreal Engine | Integrierter Adapter für technisches Design, Feature-Implementierung, Code-Review, Engine-Lebenszyklus und Validierungsrichtlinien |
| Godot | Integrierter Adapter für technisches Design, Feature-Implementierung, Code-Review, Engine-Lebenszyklus und Validierungsrichtlinien |
| Browser-Spiele | Erkennt Browser-Projekte und übergibt frameworkspezifische Arbeiten an installierte Game Studio Skills für Phaser 2D, Three.js/WebGL oder React Three Fiber |
| Unbekannte oder widersprüchliche Merkmale | Bleibt Engine-neutral und fordert fehlende Projektnachweise an, anstatt die Engine zu erraten |

Konzept-, Spiel- und Feature-Design bleiben Engine-unabhängig, solange eine
Engine-Einschränkung das für Spieler sichtbare Verhalten nicht verändert.
Technische Abläufe ermitteln die Engine-Version aus den Projektdateien und prüfen
instabile APIs anhand der offiziellen Dokumentation dieser Version.

## Sicherheit und Umfang

- Die Installation verändert keine Spielprojekte und registriert keine
  Lifecycle- oder Shell-Hooks.
- Externe Aktionen wie Commit, Push, Deployment, Store-Upload und Release
  erfordern eine ausdrückliche Genehmigung.
- QA-Ergebnisse bleiben `NOT RUN`, bis nachvollziehbare Evidenz vorliegt;
  ungeprüfte Arbeit wird niemals als bestanden gemeldet.
- Optionale Projektanweisungen werden nur auf ausdrücklichen Wunsch kopiert.
- Spezialisierte Browser- und Godot-Aufgaben werden an separat installierte
  offizielle oder spezialisierte Skills übergeben, sofern diese verfügbar sind;
  andernfalls wird ein klar begrenzter Ersatzablauf verwendet.

## Repository-Struktur

- `.agents/plugins/marketplace.json` — Codex-Marketplace-Manifest
- `plugins/codex-game-studios` — vollständiges Plugin-Paket
- `plugins/codex-game-studios/docs/CODEX_MIGRATION_PLAN.md` — Zuordnung der Codex-Migration
- `plugins/codex-game-studios/docs/CODEX_PORT_REPORT.md` — Validierungs- und Sicherheitsbericht

Die aktuelle Version ist `0.1.0`. Sie basiert auf dem Upstream-Commit
`984023ddac0d5e27624f2baacde6105e45de375f` und wird unter der MIT-Lizenz verteilt.
