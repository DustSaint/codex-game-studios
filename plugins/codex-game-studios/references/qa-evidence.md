# QA and evidence model

## Evidence states

Use exactly these meanings:

- **PASS:** required evidence was executed and met the criterion.
- **FAIL:** executed evidence contradicted the criterion.
- **BLOCKED:** a named prerequisite prevented execution.
- **NOT RUN:** relevant evidence was available in principle but was not run.
- **NOT APPLICABLE:** the criterion does not apply, with a reason.

Never turn missing, stale, indirect, or assumed evidence into PASS.

## Criterion mapping

For every acceptance criterion, record:

| Criterion | Risk | Evidence type | Procedure or test | Environment | Expected result | Status | Artifact |
|---|---|---|---|---|---|---|---|

Choose evidence by behavior:

- logic: deterministic unit or property tests;
- component interaction: integration or engine tests;
- animation, camera, audio, feel, rendering: observed runtime evidence;
- UI: functional flow, layout states, input methods, resolution, accessibility;
- configuration and data: schema, import, representative content, failure mode;
- performance: target hardware, representative load, measurement method, budget;
- networking: authority, latency/loss cases, reconnect, concurrency, security;
- platform: actual target build, services, permissions, lifecycle, and device.

## Defects

A useful defect includes environment, build or revision, preconditions, minimal
steps, actual result, expected result, reproducibility, impact, evidence, and
suspected boundary without presenting the suspicion as root cause.

Add a regression test or explicit regression procedure after a root-cause fix.
Do not close a defect solely because the original symptom disappeared once.
