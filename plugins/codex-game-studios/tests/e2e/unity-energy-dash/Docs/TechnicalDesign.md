# Technical design: stamina-gated dash

## Context and constraints

- **Source design:** `DESIGN_REQUEST.md` and `Docs/FeatureContract.md`, acceptance criteria AC-1 through AC-6.
- **Detected engine:** Unity 6000.3.0f1. `ProjectSettings/ProjectVersion.txt`, `Packages/manifest.json`, and `Assets/` are a coherent Unity marker set; the project detector reported Unity with score 100, high confidence, and no mixed-engine warning.
- **Test package:** `com.unity.test-framework` 1.6.0 is declared in `Packages/manifest.json`.
- **Existing architecture:** `PlayerDash` is plain C# and owns only `nextAllowedTime`; `IStamina` is the existing resource boundary; no MonoBehaviour, scene, prefab, input component, save system, or prior test assembly exists in the fixture.
- **Constraints:** Preserve the caller-provided time API and all movement/presentation behavior, add no second stamina state, introduce no clamping, install no packages, and keep rule logic independent from Unity presentation.
- **Non-goals:** Engine lifecycle integration, UI, animation, camera, movement, input, save/load, networking, designer tooling, telemetry, and balance changes.

## Technical requirements

| ID | Requirement | Source | Owner | Validation |
|---|---|---|---|---|
| TR-1 | Reject cooldown-active attempts before touching stamina. | AC-2 | `PlayerDash` | EditMode test checks spend-call count and stamina |
| TR-2 | Request exactly 25 units from the existing stamina authority. | AC-1, AC-4 | `PlayerDash` + `IStamina` | EditMode tests inspect amount and result |
| TR-3 | Commit a 0.75-second cooldown only after a successful spend. | AC-1, AC-3, AC-5 | `PlayerDash` | EditMode tests cover failure retry and boundary time |
| TR-4 | Store no stamina value or fallback state in the dash feature. | Accepted request | `PlayerDash` | Source review and compiler boundary |
| TR-5 | Keep rule logic deterministic and independent from Unity APIs. | Fixture guidance | Gameplay assembly | Headless C# contract run plus Unity EditMode source |
| TR-6 | Preserve movement and presentation integration. | AC-6 | Existing downstream caller | Unity integration review and Play Mode observation |

## Ownership and data flow

### Components and responsibilities

- `IStamina` owns stamina state and the atomic `TrySpend(amount)` mutation. Its source contract will explicitly state that `false` does not mutate stamina.
- `PlayerDash` owns only cooldown state. It holds a required `IStamina` reference injected at construction and never copies `Current`.
- The existing caller owns the clock, input, movement, and presentation. It continues to use the boolean result as the commit signal.
- `ForwardTest.Gameplay` is the runtime assembly. `ForwardTest.Gameplay.EditModeTests` is an Editor-only test assembly that references it and Unity's test assemblies.

### Runtime sequence

1. Caller invokes `PlayerDash.TryDash(currentTime)`.
2. `PlayerDash` compares `currentTime` with `nextAllowedTime`.
3. If active, return `false` immediately. No stamina method is called.
4. If ready, invoke `IStamina.TrySpend(25f)` once.
5. If the spend returns `false`, return `false` and leave `nextAllowedTime` unchanged.
6. If the spend returns `true`, set `nextAllowedTime = currentTime + 0.75f` and return `true`.
7. The existing caller decides whether to perform movement and presentation from that result.

There is no update loop, allocation, polling, asynchronous work, subscription, or engine object lifetime in the feature.

### Initialization, teardown, and re-entry

- Construction requires a non-null `IStamina`; invalid composition throws `ArgumentNullException` rather than allowing a later hidden failure.
- Initial `nextAllowedTime` remains the default `0`, preserving the existing ready-at-nonnegative-time behavior.
- Teardown requires no cleanup because the class owns no external resource or subscription.
- A new instance resets cooldown exactly as the old class did. No save migration is introduced.
- Pause and scene behavior remain determined by the lifetime and time value supplied by the external integration.

### Failure paths and observability

- Cooldown rejection and stamina rejection are expected outcomes expressed as `false`, matching the existing public contract.
- Null composition is a programming/configuration error and fails immediately at construction.
- Exceptions raised by an `IStamina` implementation propagate to its caller. The dash rule will not swallow them or commit cooldown after a failed call.
- No diagnostic or telemetry channel exists in the accepted fixture, so none is invented.

## Interfaces

| Interface | Producer | Consumer | Contract | Failure behavior |
|---|---|---|---|---|
| `PlayerDash(IStamina)` | Gameplay composition | `PlayerDash` | Supply the single existing stamina owner for this dash lifetime. | Null fails immediately with `ArgumentNullException`. |
| `IStamina.TrySpend(float)` | Stamina owner | `PlayerDash` | Atomically spend the exact requested amount; `false` means no mutation. | `false` rejects dash without cooldown; exceptions propagate. |
| `PlayerDash.TryDash(float)` | Dash rule | Existing movement/input layer | Return `true` only after stamina and cooldown commit; caller supplies existing clock seconds. | `false` produces no movement/presentation consequence. |

## Decisions

| Decision | Options considered | Choice | Consequences | ADR needed |
|---|---|---|---|---|
| Stamina dependency | Constructor injection; method parameter; service lookup; mirrored value | Constructor-inject `IStamina` | Dependency is mandatory and stable; tests have a direct seam; call sites must supply the existing owner. | No; bounded local design |
| Spend eligibility | Check `Current` then spend; call `TrySpend` as authority | Call `TrySpend(25f)` once after cooldown check | Avoids duplicated resource rules and time-of-check/time-of-use behavior; relies on the explicit no-mutation-on-false contract. | No |
| Time source | Read `UnityEngine.Time`; preserve caller input | Preserve `currentTime` parameter | Keeps deterministic tests and existing scaled/unscaled semantics; caller contract remains finite monotonic seconds. | No |
| Tuning storage | ScriptableObject/config; constants | Keep accepted fixed values as private constants | Smallest change; adding authoring infrastructure for two fixed requirements would expand scope. | No |
| Test compilation | Editor predefined assembly; explicit runtime/test assemblies | Add one runtime asmdef and one Editor-only test asmdef | Unity Test Framework gets an explicit reference boundary; fixture code gains a named runtime assembly. | No |

### Rejected alternatives

- A second stamina field in `PlayerDash` would create competing authority and can desynchronize from `IStamina`.
- Checking or spending stamina before cooldown would allow a rejected attempt to touch the resource owner.
- Starting cooldown before `TrySpend` would require rollback on failure and violates the commit rule.
- Catching a stamina exception and returning `false` would hide a broken resource owner and leave cause/effect ambiguous.

## Delivery slices

| Slice | Files or boundaries | Dependency | Acceptance | Evidence |
|---|---|---|---|---|
| Behavioral contract | `Docs/FeatureContract.md` | Accepted request | AC-1–AC-6 | Review against source request |
| Runtime rule | `IStamina.cs`, `PlayerDash.cs`, runtime asmdef | Existing `IStamina` implementation at composition | AC-1–AC-5 | C# compile/contract run; Unity compilation pending editor |
| Regression tests | Editor-only test assembly and `PlayerDashTests.cs` | Unity Test Framework 1.6.0 | AC-1–AC-5 | Unity EditMode run when editor is available |
| Integration validation | Existing caller, scene, movement, presentation | Assets absent from fixture | AC-6 | Manual Unity inspection and Play Mode observation |

## Acceptance trace

| Criterion | Component/data path | Verification |
|---|---|---|
| AC-1 | Caller → cooldown check → `TrySpend(25)` → cooldown commit | Success EditMode test and headless contract check |
| AC-2 | Caller → active cooldown early return | Cooldown rejection test checks no second spend |
| AC-3 | Caller → failed `TrySpend` → unchanged cooldown → retry | Insufficient-stamina recovery test |
| AC-4 | `TrySpend(25)` against exactly 25 | Exact-cost EditMode test |
| AC-5 | Strict `< nextAllowedTime` comparison | Exact cooldown-boundary EditMode test |
| AC-6 | Boolean result → external movement/presentation | Unity integration review and Play Mode; not provable in this fixture alone |

## Risks and open questions

| Item | Impact | Resolution or experiment | Owner |
|---|---|---|---|
| No concrete `IStamina` implementation is present. | Integration could violate the documented no-mutation-on-false contract. | Audit the production implementation and run the same cases through it during integration. | Stamina owner / QA |
| No Unity executable or scene is guaranteed in the environment. | Unity compilation, Test Runner, and presentation evidence may be unavailable. | Run local tool discovery; label missing engine evidence without converting it to pass. | Implementer / QA |
| No caller exists in the fixture. | Constructor wiring and unchanged movement/presentation cannot be observed. | Integrate at the existing production composition root and execute AC-6 there. | Unity integrator |
| Caller clock can be invalid or non-monotonic. | Existing cooldown semantics become undefined. | Preserve existing API now; define/validate a stronger clock contract only under a separate requirement. | Dash integration owner |

No unresolved question blocks the isolated rule-layer implementation. Production integration remains a required follow-up because its assets are intentionally absent.
