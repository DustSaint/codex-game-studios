# Feature contract: stamina-gated dash

## Outcome

- **Player problem:** The existing cooldown limits dash frequency, but dash attempts do not participate in the stamina economy.
- **Desired outcome:** A dash succeeds only when it is both off cooldown and the existing stamina owner can spend exactly 25 stamina units.
- **Supported design goal:** The accepted request establishes resource-constrained action as the goal. No broader product pillar was supplied.
- **Source requirement:** `DESIGN_REQUEST.md` is the accepted player-behavior contract.
- **Target context:** Existing players using the current dash input and presentation. The caller already owns input, movement, feedback, a monotonic game-time value, and an `IStamina` implementation.
- **Included behavior:** Eligibility ordering, exact stamina cost, cooldown commit timing, rejection behavior, retry behavior, and deterministic rule coverage.
- **Explicit exclusions:** Movement, distance, direction, animation, camera, input binding, UI, audio, save data, networking, telemetry, and stamina regeneration or maximum-stamina rules.
- **Deferred extensions:** Designer-authored tuning data, player-facing low-stamina feedback, telemetry, persistence, and multiplayer authority require separate accepted requirements.

## Entry, flow, and exit

1. The caller sends a dash attempt with the current game-time value.
2. If the current time is earlier than the next allowed time, the attempt exits as rejected without consulting or mutating stamina.
3. Otherwise, `PlayerDash` asks the existing `IStamina` owner to spend exactly 25 stamina units.
4. If the spend fails, the attempt exits as rejected and the cooldown remains ready.
5. If the spend succeeds, `PlayerDash` schedules the next allowed time for 0.75 seconds later and exits as successful. Existing caller-owned movement and presentation may then run from the successful result.

The return value is the complete feature output: `true` means the cost and cooldown were committed; `false` means no dash consequence should be presented.

## Behavioral contract

### States and transitions

| Current state | Event | Guard | Next state | Stamina effect | Output |
|---|---|---|---|---|---|
| Ready | Dash attempt | `IStamina.TrySpend(25)` succeeds | Cooldown | Spend exactly 25 | `true` |
| Ready | Dash attempt | Spend fails | Ready | No change | `false` |
| Cooldown | Dash attempt | `currentTime < nextAllowedTime` | Cooldown | No call and no change | `false` |
| Cooldown | Time reaches `nextAllowedTime` | None | Ready | No change | No output until the next attempt |

- A rejected ready-state attempt may be retried immediately because it does not start cooldown.
- A rejected cooldown-state attempt may be retried when the caller's clock reaches the scheduled threshold.
- A new `PlayerDash` instance starts ready. Runtime cooldown state is not saved or migrated.
- Disable, destruction, scene change, or reload behavior is owned by the lifetime of the caller-created `PlayerDash` instance; this fixture adds no engine lifecycle layer.
- Pause behavior continues to follow the caller-provided clock. No scaled-versus-unscaled time choice is introduced here.
- Disconnect and reconnect are not applicable because this fixture contains no network state.

### Rules, formulas, and invariants

- `dashCost = 25` stamina units, with no rounding or clamping by the dash feature.
- `cooldownDuration = 0.75` seconds.
- After a successful attempt at `t_success`, `nextAllowedTime = t_success + 0.75 seconds`.
- Cooldown is active only while `currentTime < nextAllowedTime`; equality is eligible.
- `currentTime` is expected to be a finite, monotonic value in seconds, matching the pre-existing API contract.
- `IStamina.TrySpend` is the sole stamina mutation authority. The dash feature stores no current, maximum, reserved, or pending stamina value.
- A `false` result from `IStamina.TrySpend` must leave stamina unchanged; this is an upstream interface invariant.
- Cooldown changes if and only if the stamina spend succeeds.
- All tuning values above are accepted requirements, not balance hypotheses. Fun, feel, and balance remain unvalidated without playtesting.

## Player-facing and cross-discipline requirements

- Existing controls, movement, animation, camera, audio, and other presentation must not change.
- The existing caller must trigger dash presentation only from a `true` result. This fixture has no presentation layer to modify or observe.
- The binary success result remains usable without audio, color, text, or motion, but any player-facing explanation for rejection is outside the accepted scope.
- No new localized strings, content assets, authoring workflow, or migration work are required.

## Dependencies and ownership

| Dependency | Role | Owner | Contract |
|---|---|---|---|
| `IStamina` | Upstream resource authority | Existing stamina system | Atomically spend the requested amount, returning `false` without mutation when unavailable |
| Caller clock | Upstream timing input | Existing dash integration | Supply finite monotonic seconds using the same time semantics as the working cooldown |
| Dash caller/presentation | Downstream consumer | Existing movement/input layer | Act only when `TryDash` returns `true` |
| `PlayerDash` | Cooldown state owner | Dash feature | Check cooldown first; commit cooldown only after a successful spend |

## Acceptance and evidence

| ID | Observable acceptance criterion | Required evidence | Persisted state |
|---|---|---|---|
| AC-1 | Given ready dash state and 50 stamina, an attempt succeeds, requests a spend of exactly 25, leaves 25, and starts cooldown. | Deterministic EditMode test | Runtime cooldown only |
| AC-2 | Given a successful dash at time `t`, another attempt before `t + 0.75` fails without another spend attempt or stamina change. | Deterministic EditMode test | Existing cooldown retained |
| AC-3 | Given ready state and stamina below 25, an attempt fails without stamina or cooldown change; after stamina becomes 25, a retry at the same time can succeed. | Deterministic EditMode test | Ready state retained after rejection |
| AC-4 | Given exactly 25 stamina and ready state, an attempt succeeds and leaves exactly 0. | Deterministic EditMode test | Runtime cooldown only |
| AC-5 | Given enough stamina after a successful dash, an attempt at exactly `t + 0.75` is eligible and succeeds. | Deterministic EditMode test | New cooldown scheduled |
| AC-6 | Existing movement, animation, camera, input, and presentation are unchanged and occur only for a successful result. | Unity integration review and Play Mode observation | No new persisted state |

## Risks and decisions

| Item | Current fact | Decision or mitigation | Owner |
|---|---|---|---|
| Stamina mutation semantics | `IStamina` exposes `TrySpend`, but the source lacked an explicit failure invariant. | Document and test that a failed spend does not mutate; call it as the single authority. | Stamina implementation owner |
| Time validity | The pre-existing method accepts a raw `float` time. | Preserve the API and existing clock semantics; caller remains responsible for finite monotonic values. | Dash integration owner |
| Integration evidence | The fixture has no input, movement, scene, or presentation code. | Limit implementation to the rule layer and leave AC-6 for Unity integration execution. | Unity integrator / QA |
| Balance and usability | Cost and cooldown are fixed by the accepted request. | Do not claim balance or feel; schedule representative playtesting if those questions matter. | Design / QA |

## Decisions and next step

- **Chosen:** Constructor injection of the existing stamina abstraction, atomic spend through `TrySpend`, and cooldown commit after successful spend.
- **Rejected:** Mirroring stamina in `PlayerDash`, pre-spending before the cooldown check, or starting cooldown on a failed spend; each violates an accepted invariant.
- **Open product questions:** None block this delivery slice.
- **Next unblocked step:** Implement the rule in the plain C# dash class, add Unity EditMode coverage for AC-1 through AC-5, then execute every locally available validation and preserve AC-6 as explicit manual coverage.
