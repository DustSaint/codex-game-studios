# Unity adapter

Load this only after Unity is detected.

## Establish context

- Read `ProjectSettings/ProjectVersion.txt` and `Packages/manifest.json`.
- Inspect relevant assembly definitions, scenes, prefabs, ScriptableObjects,
  input setup, render pipeline, and existing test assemblies.
- Follow established project patterns before suggesting a new framework.
- Verify version-sensitive Unity and package APIs in official documentation.

## Design-to-delivery path

1. Translate observable feature behavior into stable responsibilities and data.
2. Assign ownership across plain C# logic, MonoBehaviours, ScriptableObjects,
   scene or prefab composition, services, editor tooling, and saved state.
3. Keep core rules independently testable when the project architecture allows
   it; keep engine lifecycle and presentation at explicit boundaries.
4. Decide scene and prefab ownership before editing nested assets. Respect
   variants and avoid accidental broad serialization churn.
5. Match runtime work to Unity lifecycle: initialization, enable/disable,
   update cadence, scene transitions, domain reload, and destruction.
6. Define resource lifetime for Addressables, pools, subscriptions, async work,
   native allocations, and generated objects.
7. Implement the smallest accepted scope and add EditMode or PlayMode tests as
   appropriate. Do not claim visual, physics-feel, animation, camera, input,
   platform, or build behavior without running the relevant validation.

## Review focus

- per-frame allocation, repeated component lookup, uncontrolled polling;
- event subscription symmetry and destroyed-object references;
- async cancellation and scene-lifetime races;
- prefab or scene ownership and serialization noise;
- ScriptableObject mutation at runtime and persistence assumptions;
- deterministic logic boundaries and test isolation;
- package/version compatibility, stripping, and platform conditionals;
- asset load/release symmetry and pool reset correctness.

## Evidence

Use the narrowest combination that proves the claim: EditMode tests, PlayMode
tests, compilation, scene run, profiler capture, frame debugger, device build,
input-device check, and recorded visual inspection. Record anything not run.
