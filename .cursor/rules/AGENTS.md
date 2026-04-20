# AGENTS.md

You are an expert in JavaScript, Rsbuild, and web application development. You write maintainable, performant, and accessible code.

## Commands

- `bun run dev` — Start the dev server
- `bun run build` — Build the app for production
- `bun run preview` — Preview the production build locally

## Docs

- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt

## Tools

**Linting (TypeScript/React)** is **ESLint** only. **Formatting** is **Biome** only (Biome linter is off to avoid overlapping rules).

### Check (no writes)

Run separately when validating CI or before commit:

- `bun run format` — Biome: verify formatting (`biome format .`)
- `bun run lint` — ESLint (zero warnings)
- `bun run typecheck` — `tsc --noEmit`

### Fix (apply auto-fixes)

Same areas with `:fix` where supported:

- `bun run format:fix` — Biome: write formatted files (`biome format --write .`)
- `bun run lint:fix` — ESLint `--fix` (import order, etc.)

There is no `typecheck:fix`; address type errors in the editor or by changing code.
