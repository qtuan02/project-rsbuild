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

### Entry points

- [`src/main.tsx`](src/main.tsx): bootstrap và mount React app.
- [`src/app.tsx`](src/app.tsx): tập trung providers (theme, query client, router, toaster).
- [`src/app-routes.tsx`](src/app-routes.tsx): route tree theo module.
- [`src/config/routes.ts`](src/config/routes.ts): route config và metadata source-of-truth.

### Source tree (thực tế)

```text
src/
  app.tsx
  app-routes.tsx
  main.tsx
  config/
    app.ts
    env.ts
    routes.ts
  features/
    <feature>/
      pages/        # screen/page composition (route-level)
      components/   # presentational components theo feature
      hooks/        # view-model, state orchestration, query/form integration
      domain/       # pure business logic, parser/filter/pagination/stats
      data/         # repository, query functions, API/mock mapping
      constants/    # constants nội bộ feature (optional)
  components/
    ui/             # shadcn/radix primitives
    shared/         # reusable app-level widgets (layout/table/pagination/...)
    stories/        # Storybook stories (không dùng cho runtime app)
  lib/              # framework-agnostic utilities (cn, query keys, query client)
  types/            # shared domain contracts/types
  styles/
    globals.css
```

### Layering conventions

- Feature có thể không cần đủ mọi layer; chỉ tạo thư mục khi có nhu cầu thật.
- Ưu tiên luồng phụ thuộc: `pages -> hooks -> domain/data`.
- `domain` giữ logic thuần, không phụ thuộc UI hoặc network.
- `data` xử lý API/repository và mapping, không render UI.
- `components` ưu tiên presentational; hạn chế side effects và không gọi API trực tiếp.
- Tái sử dụng UI primitives từ `components/ui` trước khi tạo primitive mới.
- Code tái sử dụng liên-feature nên đưa về `components/shared`, `lib`, hoặc `types`.

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
