# Validation evidence: stamina-gated dash

## Evidence target

- Fixture snapshot: local working files on 2026-08-17; the fixture has no Git metadata or revision identifier.
- Declared engine: Unity 6000.3.0f1.
- Host: Windows PowerShell in the fixture directory.
- Scope: plain C# dash rules, contract-test source, JSON descriptors, and engine-marker detection.

## Executed evidence

### Runtime compilation

The installed compiler was discovered at `C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe` and identified itself as Microsoft C# Compiler 4.8.9232.0. It is a legacy compiler, so the implementation uses the behaviorally equivalent explicit parameter string rather than the unsupported `nameof` operator.

Command:

```powershell
& 'C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe' /nologo /warnaserror+ /target:exe /out:_local_validation\PlayerDashContractRunner.exe Assets\Scripts\IStamina.cs Assets\Scripts\PlayerDash.cs _local_validation\PlayerDashContractRunner.cs
```

Result: exit code 0 with no warnings or errors.

### Headless runtime contract checks

Command:

```powershell
& '.\_local_validation\PlayerDashContractRunner.exe'
```

Observed result, exit code 0:

```text
CHECK|PASS|success_spends_exact_cost
CHECK|PASS|cooldown_rejection_does_not_spend
CHECK|PASS|insufficient_stamina_preserves_retry
CHECK|PASS|exact_cost_succeeds
CHECK|PASS|exact_cooldown_boundary_is_eligible
CHECK|PASS|null_stamina_is_rejected
RESULT|PASS|6/6 contract checks
```

The runner compiled the delivered `IStamina.cs` and `PlayerDash.cs` directly; it did not use a copied runtime implementation. The temporary runner and executable were removed after this transcript was retained.

### JSON descriptors

`ConvertFrom-Json -ErrorAction Stop` parsed each of these files successfully:

```text
JSON|PASS|Packages\manifest.json
JSON|PASS|Assets\Scripts\ForwardTest.Gameplay.asmdef
JSON|PASS|Assets\Tests\EditMode\ForwardTest.Gameplay.EditModeTests.asmdef
```

### Engine detection

Command:

```powershell
python ..\..\..\outputs\codex-game-studios\scripts\detect_game_project.py .
```

Observed result: Unity was the sole detection, score 100, confidence `high`, with `Assets/`, `Packages/manifest.json`, and `ProjectSettings/ProjectVersion.txt` as evidence. `mixed`, `monorepo`, and warnings were all false or empty.

## Tool and environment limits

- `Unity` and `Unity.exe` were not on `PATH`.
- Neither `C:\Program Files\Unity\Hub\Editor` nor `C:\Program Files\Unity\Editor` existed.
- The `dotnet` host existed, but `dotnet --version` reported that no .NET SDK was installed.
- No Unity scene, dash caller, concrete `IStamina`, input, movement, animation, camera, or presentation asset exists in the fixture.

Consequently:

- The NUnit EditMode source was authored but **not executed** in Unity Test Runner.
- Unity project import/compilation, Play Mode, movement, animation, camera, input, UI, audio, platform build, profiling, and device behavior were **not run**.
- The headless pass proves the deterministic behavior of the delivered plain C# rule files on the installed .NET Framework runtime. It does not prove Unity assembly import, production composition, presentation, or platform integration.
