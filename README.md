# Frontend (Rsbuild + React)

## Environment

Copy the template and adjust the API URL:

```bash
cp .env.template .env
```

- **Rsbuild** loads `.env`, `.env.local`, etc. from the **project root** when you run `bun run dev` or `bun run build`. Variables prefixed with `PUBLIC_` are embedded in the client bundle.
- Runtime values are validated with **Zod** in [`src/config/env.ts`](src/config/env.ts) (invalid URL falls back to the default).
- If you need to run a **non-Rsbuild** command with the same variables as `.env`, use:

```bash
bun run with-env -- <command>
```

Example: `bun run with-env -- bunx some-cli`

## Setup

```bash
bun install
```

**Tooling:** **Check** = `format`, `lint`, `typecheck` (three commands, no writes). **Fix** = `format:fix`, `lint:fix` where auto-fix exists. TypeScript has no `typecheck:fix`.

## Scripts

| Script                    | Description                        |
| ------------------------- | ---------------------------------- |
| `bun run dev`             | Rsbuild dev server                 |
| `bun run build`           | Production build                   |
| `bun run preview`         | Preview production build           |
| `bun run storybook`       | Storybook (Rsbuild) :6006          |
| `bun run build-storybook` | Static Storybook output            |
| `bun run format`          | Check formatting (Biome, no write) |
| `bun run format:fix`      | Write formatting (Biome)           |
| `bun run lint`            | ESLint                             |
| `bun run lint:fix`        | ESLint with `--fix`                |
| `bun run typecheck`       | TypeScript (`tsc --noEmit`)        |
| `bun run with-env`        | Prefix: load `.env` then run command |

## Deploy on Vercel

- Root Directory: `.` (project root)
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`

Project already includes `vercel.json` for:

- Static build output (`dist`)
- SPA fallback (`/index.html`) so React Router routes work after refresh/direct links

Before deploy, configure environment variables in Vercel Project Settings:

- `PUBLIC_API_BASE_URL`

## Learn more

- [Rsbuild](https://rsbuild.rs) — [Environment variables](https://rsbuild.rs/guide/advanced/env-vars)
- [Storybook Rsbuild](https://storybook.rsbuild.rs)
