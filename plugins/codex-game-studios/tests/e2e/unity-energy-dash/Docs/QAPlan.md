# QA plan: stamina-gated dash

## Scope and environments

- **Target:** The accepted stamina gate added to the existing cooldown-only `PlayerDash` rule.
- **Authoritative requirements:** `DESIGN_REQUEST.md`, normalized as AC-1 through AC-6 in `Docs/FeatureContract.md`; architecture and evidence boundaries are in `Docs/TechnicalDesign.md`.
- **In scope:** Exact spend, cooldown ordering and duration, insufficient-stamina recovery, exact-cost boundary, dependency validity, Unity test assembly/import, and unchanged downstream dash behavior.
- **Out of scope:** Dash balance, regeneration, maximum stamina, new feedback, save migration, networking, telemetry, and unrelated movement/presentation changes.
- **Current snapshot:** Local fixture files on 2026-08-17. There is no Git repository or build identifier in the fixture.
- **Current local environment:** Windows host; .NET Framework C# compiler 4.8.9232.0; no Unity executable; no .NET SDK; no scene, concrete stamina component, or downstream dash caller.
- **Required Unity environment:** Unity 6000.3.0f1 with `com.unity.test-framework` 1.6.0 resolved, a representative scene, the production `IStamina` implementation, and the existing movement/presentation caller.
- **Audience/owners:** Gameplay engineer for automated rule and integration wiring; QA for Unity execution and retained evidence; design for any later balance/feel decision.
- **Schedule constraint:** No milestone date was supplied. Execute before integration approval or merge into a production project.

### Entry criteria and blockers

Entry to deterministic local rule checking requires readable source and a C# compiler; this was met. Entry to Unity verification requires:

1. Unity 6000.3.0f1 installed and launchable.
2. Package restore/import completes with Test Framework 1.6.0.
3. Runtime and test asmdefs compile without errors.
4. The production caller supplies a non-null `IStamina` and the same monotonic clock used by the working cooldown.
5. A representative Play Mode scene exposes the existing movement, animation, camera, and input behavior.

Missing items 1, 4, and 5 block Unity integration execution in the current fixture.

## Risk matrix

| Risk | Likelihood | Impact | Detection | Priority |
|---|---|---|---|---|
| Cooldown rejection touches stamina | Medium | High: resource loss without dash | Spend-call count and current value | P0 |
| Failed stamina spend starts cooldown | Medium | High: player is locked out after rejection | Same-time recovery attempt | P0 |
| Exact 25 is treated as insufficient or clamped | Medium | High: accepted boundary is wrong | Exact-cost automated case | P0 |
| Concrete `IStamina` mutates on failed `TrySpend` | Unknown; implementation absent | High: interface invariant breaks | Production implementation audit and integration test | P0 |
| Constructor wiring supplies null or wrong stamina owner | Medium until integrated | High: dash cannot execute correctly | Composition test / immediate exception | P0 |
| Unity asmdef or package import incompatibility | Low–medium; not executed | Medium: tests/runtime fail to compile | Unity import and EditMode run | P1 |
| Caller presents movement on a rejected result | Unknown; caller absent | High: free or misleading dash | Play Mode observation/integration test | P1 |
| Pause or non-monotonic clock changes cooldown semantics | Unknown; clock absent | Medium | Pause/time-scale procedure | P2 |
| Cost/cooldown feel is poor | Unknown | Medium | Representative playtest, not code tests | P2 |

## Acceptance coverage

Statuses below describe specific evidence activities, not an inferred overall release result.

| Criterion | Risk | Evidence type | Test or procedure | Expected | Status | Artifact |
|---|---|---|---|---|---|---|
| AC-1 | Exact cost or commit order wrong | Deterministic runtime execution | Headless `success_spends_exact_cost` check against delivered sources | Success; one request for 25; 50 becomes 25 | PASS | `Docs/ValidationEvidence.md` transcript |
| AC-2 | Cooldown rejection spends | Deterministic runtime execution | Headless `cooldown_rejection_does_not_spend` | Before `t + 0.75`, false; no second spend; stamina unchanged | PASS | `Docs/ValidationEvidence.md` transcript |
| AC-3 | Failed spend starts cooldown | Deterministic runtime execution | Headless `insufficient_stamina_preserves_retry` | Below 25 fails unchanged; same-time retry at 25 succeeds | PASS | `Docs/ValidationEvidence.md` transcript |
| AC-4 | Equality boundary wrong/clamped | Deterministic runtime execution | Headless `exact_cost_succeeds` | Exactly 25 succeeds and becomes 0 | PASS | `Docs/ValidationEvidence.md` transcript |
| AC-5 | Cooldown equality boundary wrong | Deterministic runtime execution | Headless `exact_cooldown_boundary_is_eligible` | Attempt at exactly `t + 0.75` succeeds | PASS | `Docs/ValidationEvidence.md` transcript |
| AC-1–AC-5 | Unity compilation/runtime semantics differ | Unity EditMode tests | Run all six tests in `PlayerDashTests` through Unity Test Runner | 6 passed, 0 failed/skipped, retained XML/log | BLOCKED | Unity executable unavailable; no Unity result exists |
| AC-6 | Rejected attempt changes existing presentation | Integration + observed runtime | Exercise success, cooldown reject, and stamina reject in representative Play Mode scene | Existing movement/presentation only on `true`; no new visual/input changes | BLOCKED | Caller, scene, and Unity executable absent |
| Constructor invariant | Invalid composition survives silently | Deterministic runtime execution | Headless `null_stamina_is_rejected` | Immediate `ArgumentNullException` naming `stamina` | PASS | `Docs/ValidationEvidence.md` transcript |

## Detailed Unity procedures

### QA-ED-01: EditMode regression suite

- **Level/setup:** Unity EditMode; open the fixture in Unity 6000.3.0f1 and allow package import to finish.
- **Steps:** Confirm both asmdefs compile; run `ForwardTest.Gameplay.EditModeTests.PlayerDashTests` in Test Runner; export or retain the result XML and Editor log excerpt.
- **Expected:** Six tests pass, with no compile errors, failed tests, ignored tests, or unexpected log exceptions.
- **Automation suitability:** Required automated gate.
- **Current status:** BLOCKED because no Unity executable is installed.

### QA-INT-01: Production stamina integration

- **Level/setup:** Representative scene using the actual `IStamina` implementation and existing dash caller; expose precise current stamina for test setup.
- **Steps:** Run successful, cooldown-active, insufficient, and exact-cost attempts; inspect resource before/after and downstream dash result.
- **Expected:** Results match AC-1 through AC-5; a failed `TrySpend` never mutates production stamina.
- **Evidence:** Before/after values, Unity log/test record, and caller result; video only if needed to establish presentation timing.
- **Current status:** BLOCKED because the concrete implementation and caller are absent.

### QA-PLAY-01: Unchanged player-facing behavior

- **Level/setup:** Representative Play Mode scene with the existing input, movement, animation, camera, and audio/presentation path.
- **Steps:** Perform one valid dash, one attempt during cooldown, and one attempt below cost; repeat with keyboard/controller inputs supported by the product; pause during cooldown if the existing feature supports pause.
- **Expected:** Valid attempt uses the unchanged movement/presentation; rejected attempts produce no dash movement or success presentation; controls and camera remain unchanged; cooldown follows the pre-existing pause/time semantics.
- **Accessibility observation:** Confirm no existing non-audio success/rejection signal was removed or made misleading. The accepted slice adds no new UI or localized text.
- **Current status:** BLOCKED because the scene, input path, presentation, and Unity executable are absent.

## Cross-cutting coverage

- **Initialization/teardown/re-entry:** Null dependency rejection passed headlessly. New-instance reset, scene teardown, and domain reload are NOT RUN in Unity.
- **Retry/recovery:** Same-time retry after an insufficient spend passed headlessly. Retry through the production stamina implementation is BLOCKED.
- **Save/load/migration:** NOT APPLICABLE; cooldown remains instance-local and the accepted feature introduces no saved data.
- **Input/focus/pause/time scale:** NOT RUN; caller assets are absent. Preserve the exact time source used by the previously working cooldown.
- **Resolution/accessibility/localization:** No new UI or strings exist. Regression observation of existing feedback is BLOCKED with AC-6.
- **Performance/soak:** No per-frame path, allocation, subscription, or async work was added. No numeric performance requirement exists, so profiling and soak are NOT APPLICABLE to this isolated rule; representative production profiling remains governed by the host project.
- **Network authority/reconnect/concurrency:** NOT APPLICABLE to this fixture; no network behavior or authority requirement exists.
- **Platform build/services/permissions/lifecycle:** NOT RUN and not a release claim; only target-platform execution can establish these.

## Regression, gates, and triage

### Execution order

1. Import and compile in the declared Unity version.
2. Run the full six-test EditMode suite and retain XML/log evidence.
3. Audit the concrete `IStamina.TrySpend` failure invariant and constructor wiring.
4. Run the production integration matrix for success, cooldown rejection, insufficient stamina, exact-cost, and exact-time boundary.
5. Run the player-facing Play Mode regression, including pause if supported.
6. Perform balance/feel playtesting only if design requests a balance decision.

### Exit criteria

- Unity project imports and compiles with no new errors or warnings attributable to this slice.
- All six EditMode tests pass in Unity 6000.3.0f1 with retained results.
- Production `IStamina` and caller integration pass AC-1 through AC-6.
- No open P0/P1 defect affects stamina mutation, cooldown, dash eligibility, or downstream presentation.
- Any residual risk has an explicit owner, rationale, mitigation, and expiry. No waiver is currently authorized.

The current local headless result is not sufficient for the Unity integration gate.

### Failure and rerun policy

- Diagnose the first causal failure; do not skip a case, weaken an expectation, or catch an exception to obtain a pass.
- After a rule or stamina fix, rerun the failing case, the complete six-test EditMode suite, and all three core integration outcomes (success, cooldown reject, insufficient reject).
- After a caller, input, timing, or presentation fix, rerun AC-6 plus the automated suite to confirm the commit signal remains unchanged.
- Record defects with environment, fixture/build identifier, setup, minimal steps, actual versus expected, reproducibility, impact, and retained evidence. Suspected boundaries are not confirmed root causes.

## Coverage gaps and next responsibility

- **Gap:** Unity import and EditMode execution. **Next owner:** Gameplay engineer or QA with Unity 6000.3.0f1.
- **Gap:** Concrete stamina invariant and constructor wiring. **Next owner:** Production stamina/dash integrator.
- **Gap:** Movement, animation, camera, input, pause, and player-facing regression. **Next owner:** QA in a representative Play Mode scene.
- **Gap:** Balance and usability. **Next owner:** Design and playtest participants if requested; no current pass/fail claim is possible.
