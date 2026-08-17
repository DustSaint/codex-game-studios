# Accepted feature request: stamina-gated dash

The existing dash cooldown works. Add stamina gating without changing movement
or presentation.

- A dash costs 25 stamina.
- Cooldown is 0.75 seconds and starts only after a successful dash.
- If cooldown is active, the attempt fails and stamina is unchanged.
- If stamina is below 25, the attempt fails and cooldown is unchanged.
- Exactly 25 stamina is sufficient.
- Stamina ownership stays in the existing `IStamina` abstraction.
- The dash feature must not add a second stamina state or silently clamp values.
- Provide automated coverage for success, cooldown rejection, insufficient
  stamina, and the exact-cost boundary.
- Manual Unity movement, animation, camera, and input validation may remain
  explicitly NOT RUN in this environment.
