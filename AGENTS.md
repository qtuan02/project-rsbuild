# AGENTS.md — Codex entrypoint

This repository keeps detailed project rules in the `rules/` folder.

## Rule loading

Before changing code, read:

1. `rules/PROJECT_RULES.md` for the main project rules.
2. `rules/naming.md` for file, folder, variable, function, component, hook, type, and domain naming.
3. The relevant scoped rule file based on the files being changed:
   - `rules/src.md` for general `src/` work.
   - `rules/features.md` for `src/features/**` work.
   - `rules/components.md` for `src/components/**` work.
   - `rules/components-ui.md` for `src/components/ui/**` work.
   - `rules/hooks.md` for `src/hooks/**` work.
   - `rules/utils.md` for `src/utils/**` work.
   - `rules/libs.md` for `src/libs/**` work.
4. `rules/code_review.md` before final review or when asked to review code.
5. `rules/prompts/feature-development.prompt.md` when the user asks to create a new feature and needs a reusable feature prompt.

## Precedence

Use this priority order when rules conflict:

1. The user's latest explicit instruction.
2. The most specific scoped rule in `rules/`.
3. `rules/naming.md` for naming decisions.
4. `rules/PROJECT_RULES.md`.
5. This root `AGENTS.md`.

Do not ignore the `rules/` folder. Treat it as the source of truth replacing old Cursor rules.

## Verification

Before finishing code changes, run the project verification commands from `rules/PROJECT_RULES.md`:

```bash
bun lint
bun format
bun typecheck
```

If a command cannot be run, explain the reason and the risk in the final response.
