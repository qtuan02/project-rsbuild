# Frontend

React + TypeScript app dùng Rsbuild, TanStack Query, TanStack Table, dnd-kit và hệ UI theo hướng shared components.

## Tech stack

- React 19 + TypeScript
- Rsbuild (build/dev)
- React Router
- TanStack Query + Axios
- TanStack Table + dnd-kit
- Tailwind CSS + Radix UI
- ESLint + Biome (format only)

## Requirements

- Node.js `>=22.21.0`
- Bun (khuyến nghị để chạy scripts trong repo)

## Quick start

1) Cài dependency

```bash
bun install
```

2) Tạo env local

```bash
cp .env.template .env
```

3) Chạy dev

```bash
bun run dev
```

## Environment variables

- Rsbuild đọc `.env`, `.env.local` ở root project.
- Chỉ biến có prefix `PUBLIC_` mới được expose lên client bundle.
- Runtime env được validate ở [`src/config/env.ts`](src/config/env.ts).
- Nếu URL không hợp lệ, app fallback về `http://localhost:3000`.

Chạy command bất kỳ với env từ `.env`:

```bash
bun run with-env -- <command>
```

Ví dụ:

```bash
bun run with-env -- bunx some-cli
```

## Scripts

- `bun run dev`: chạy dev server
- `bun run build`: build production
- `bun run preview`: preview bản build
- `bun run storybook`: chạy Storybook ở `:6006`
- `bun run build-storybook`: build static Storybook
- `bun run format`: check format (không ghi file)
- `bun run format:fix`: format và ghi file
- `bun run lint`: ESLint (max warnings = 0)
- `bun run lint:fix`: ESLint auto-fix
- `bun run typecheck`: `tsc --noEmit`
- `bun run with-env`: wrapper để nạp `.env`

## Code quality workflow

Trước khi mở PR:

```bash
bun run format
bun run lint
bun run typecheck
```

Nếu cần auto-fix:

```bash
bun run format:fix
bun run lint:fix
```

## Architecture overview

App entry:

- [`src/main.tsx`](src/main.tsx): mount React app
- [`src/app.tsx`](src/app.tsx): providers (theme, query client, router, toaster)
- [`src/app-routes.tsx`](src/app-routes.tsx): route tree
- [`src/config/routes.ts`](src/config/routes.ts): route config + metadata source-of-truth

Feature modules hiện theo hướng clean layers:

- `features/<feature>/data`: mock/repository
- `features/<feature>/domain`: pure logic (filter, pagination, stats, parser)
- `features/<feature>/hooks`: state + view-model
- `features/<feature>/components`: presentational components
- `features/<feature>/pages`: page composition

Shared reusable:

- `components/shared/table`: generic data-table stack
- `components/shared/pagination`: pagination primitives
- `types`: domain types dùng chung
- `lib`: framework-agnostic utilities (`cn`, query key helpers, query client)

## Deployment (Vercel)

Project đã có `vercel.json` cho:

- output static từ `dist`
- SPA fallback về `/index.html`

Thiết lập Vercel:

- Root Directory: `.`
- Build Command: `npm run build`
- Output Directory: `dist`
- Env bắt buộc: `PUBLIC_API_BASE_URL`

Chi tiết CI/CD checklist: [`.github/CICD_SETUP.md`](.github/CICD_SETUP.md)

## References

- [Rsbuild docs](https://rsbuild.rs)
- [Rsbuild env vars](https://rsbuild.rs/guide/advanced/env-vars)
- [Storybook Rsbuild](https://storybook.rsbuild.rs)
