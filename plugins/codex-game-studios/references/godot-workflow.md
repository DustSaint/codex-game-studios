# Godot adapter

Load this only after Godot is detected.

## Establish context

- Read `project.godot`, project features, input actions, autoloads, relevant
  scenes, resources, scripts, addons, and test setup.
- Confirm whether the project uses GDScript, C#, GDExtension, or a mix.
- Verify version-sensitive APIs against official Godot documentation for the
  configured project version.

## Technical boundaries

- Prefer scene and node composition with clear ownership over deep inheritance.
- Define signal direction, connection lifetime, node-path assumptions, scene
  transitions, and freed-node behavior.
- Keep reusable data in Resources only when mutation and sharing semantics are
  understood; distinguish editor assets from runtime state.
- Use autoloads for genuine application-wide ownership, not convenient global
  access to feature state.
- Keep deterministic game rules separable from frame, physics, and presentation
  callbacks where the existing architecture permits.

## Review and evidence

Check `_process` and `_physics_process` cost, signal cleanup, deferred calls,
node lifetime, scene-tree ordering, resource aliasing, input propagation,
thread and await behavior, export configuration, and platform assumptions.
Use unit or integration tests, headless runs, scene execution, profiler data,
export builds, and target-device checks as appropriate. Record anything not
run. If `$godot-master` is installed, use it for deeper implementation work.
