# Forward-test fixture guidance

- Treat `DESIGN_REQUEST.md` as the accepted player-behavior contract.
- Keep runtime rule logic independent from engine presentation.
- Modify only this fixture.
- Do not claim Unity Editor, Play Mode, or platform behavior was verified unless
  it was actually run.
- Add comments only for invariants or reasoning a future maintainer must retain.
