---
name: review-game-code
description: "Perform a read-only, game-specific code review focused on correctness, lifecycle, state ownership, performance, resource cleanup, determinism, persistence, networking, and testability. Use for diffs, commits, pull requests, or bounded subsystems; do not implement fixes unless explicitly requested."
---

# Review Game Code

Review behavior, not just syntax. Prioritize defects that can break player state, corrupt content, leak resources, cause frame instability, or make a regression unobservable.

## Establish Evidence and Scope

1. Read applicable repository guidance and identify the requested diff, commit, branch comparison, or file set. Do not broaden the review to unrelated code.
2. Read the feature requirements, technical decisions, tests, and surrounding call paths needed to understand the changed behavior.
3. Follow [engine-detection.md](../../references/engine-detection.md). If engine-specific reasoning is required, load at most one matching adapter:
   - Unity: [unity-workflow.md](../../references/unity-workflow.md)
   - Unreal Engine: [unreal-workflow.md](../../references/unreal-workflow.md)
   - Godot: [godot-workflow.md](../../references/godot-workflow.md)
4. For browser projects, review the actual framework conventions and, when deeper framework context is needed, route that portion to the matching installed `$game-studio` family skill. Do not load a native-engine adapter.
5. Use [review-rubrics.md](../../references/review-rubrics.md) for severity and [qa-evidence.md](../../references/qa-evidence.md) to judge verification claims.

If the review base or intended behavior is ambiguous, state the ambiguity and obtain confirmation rather than guessing.

## Trace Runtime Behavior

Follow changed data and control flow through its callers and consumers. Check, where relevant:

- state ownership, mutation authority, ordering, reentrancy, and concurrency;
- initialization, enable or spawn, repeated entry, teardown, scene or level changes, hot reload, and cancellation;
- frame-loop cost, allocations, loading, caching, object pools, and resource release;
- input, animation, physics, audio, UI, and gameplay synchronization;
- persistence, serialization, schema migration, save compatibility, and failure recovery;
- determinism, authority, replication, prediction, rollback, and disconnect behavior;
- asset references, generated data, configuration, localization, and platform boundaries;
- error propagation, observability, dependency direction, reuse, and test seams.

Confirm that tests exercise the behavior they claim, including meaningful assertions and regression coverage. Never recommend swallowing an exception, skipping a path, retaining dead code, or weakening a failing test.

## Report Only Actionable Findings

Lead with findings in descending severity. For each finding provide:

- severity and short title;
- the tightest available file and line range;
- the concrete failure path or violated invariant;
- player, data, performance, or production impact;
- evidence and conditions required to reproduce it;
- corrective direction that addresses the cause without prescribing an unnecessary rewrite.

Do not elevate style preferences to defects. Mark an unverified concern as a question or test gap, not a confirmed bug. Mention unrelated issues separately without fixing them.

After the findings, give a brief verdict, remaining validation gaps, and any assumptions. If there are no actionable findings, say so directly and note the residual risks or checks not performed.

This workflow is read-only. Do not edit files, update a branch, or apply fixes unless the user explicitly expands the request.
