# Unreal adapter

Load this only after Unreal is detected.

## Establish context

- Read the `.uproject`, enabled plugins, target and build files, relevant
  modules, config, assets, maps, and existing automation tests.
- Respect current Blueprint/C++ boundaries and project naming conventions.
- Verify version-sensitive engine, plugin, build, replication, and UI APIs in
  official Unreal Engine documentation for the project version.

## Technical boundaries

- Define UObject, Actor, Component, Subsystem, DataAsset, and plain C++
  ownership explicitly.
- State garbage-collection reachability, soft versus hard references, async
  load lifetime, and teardown behavior.
- For networked behavior, define authority, ownership, replication condition,
  prediction, correction, relevancy, reconnect, and failure behavior.
- Use Gameplay Ability System only when its existing adoption or requirements
  justify the complexity; define tags, effects, attributes, and prediction.
- Treat Blueprint as a deliberate authoring or orchestration boundary, not a
  default dumping ground or something to replace without evidence.

## Review and evidence

Check tick cost, UObject lifetime, delegate cleanup, replication bandwidth,
RPC validation, Blueprint/C++ drift, asset reference chains, cook/package
behavior, config layering, and platform targets. Match evidence to the claim:
automation tests, editor or PIE run, multiplayer session, Insights capture,
cook/package, and target-device validation. Record anything not run.
