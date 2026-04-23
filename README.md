# Frontend

Ứng dụng quản lý vận hành cho thuê, xây bằng React + TypeScript theo kiến trúc feature-based, ưu tiên shared components và clean layering.

## Documentation map

Đây là tài liệu chính để onboarding nhanh. Các tài liệu chi tiết:

- [Architecture guide](docs/architect.md): kiến trúc code-level, layering rules và conventions khi phát triển.
- [High-level design](docs/high-level-design.md): tài liệu phân tích/thiết kế tổng thể hệ thống.
- [CI/CD guide](docs/ci-cd.md): checklist cấu hình GitHub + Vercel và quy trình deploy production.

## Tech stack

- React 19 + TypeScript
- Rsbuild (dev/build)
- React Router
- TanStack Query + Axios
- TanStack Table + dnd-kit
- Tailwind CSS + Radix UI
- ESLint + Biome (format)

## Requirements

- Node.js `>=22.21.0`
- Bun `>=1.2.3` (khuyến nghị)

## Quick start

1. Cài dependencies

```bash
bun install
```

2. Tạo env local

```bash
cp .env.template .env
```

3. Chạy local

```bash
bun run dev
```

## Environment variables

- Rsbuild đọc `.env`, `.env.local` tại root.
- Chỉ biến có prefix `PUBLIC_` mới được expose lên client.
- Runtime env được validate ở [`src/config/env.ts`](src/config/env.ts).

Chạy command bất kỳ với env:

```bash
bun run with-env -- <command>
```

## Scripts

- `bun run dev`: chạy dev server
- `bun run build`: build production
- `bun run preview`: preview bản build
- `bun run storybook`: chạy Storybook (`:6006`)
- `bun run build-storybook`: build static Storybook
- `bun run build:all`: build app + Storybook (`dist/storybook`)
- `bun run format`: check format
- `bun run format:fix`: format + ghi file
- `bun run lint`: ESLint (`max-warnings=0`)
- `bun run lint:fix`: ESLint auto-fix
- `bun run typecheck`: `tsc --noEmit`
- `bun run with-env`: wrapper nạp `.env`

## Recommended workflow

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

## Architecture summary

### Entry points

- [`src/main.tsx`](src/main.tsx): app bootstrap
- [`src/app.tsx`](src/app.tsx): providers
- [`src/app-routes.tsx`](src/app-routes.tsx): route tree
- [`src/config/routes.ts`](src/config/routes.ts): source-of-truth cho route paths/builders

### Source tree

```text
src/
  features/<feature>/
    pages/        # route-level composition
    hooks/        # orchestration state/view-model
    domain/       # pure business logic
    data/         # repository/API mapping
    components/   # feature presentational components
  components/ui/      # base primitives
  components/shared/  # reusable app widgets
  lib/                # framework-agnostic utilities
  types/              # shared contracts
```

### Layering conventions

- Dependency direction ưu tiên: `pages -> hooks -> domain/data`.
- `domain` không phụ thuộc UI/network.
- `components` không gọi API trực tiếp.
- Reuse trước khi tạo abstraction mới; code dùng chung đưa về `components/shared`, `lib`, `types`.

## Deployment (Vercel)

- Build output: `dist`
- SPA fallback: `/index.html`
- Build command: `bun run build:all`
- Env bắt buộc: `PUBLIC_API_BASE_URL`

Chi tiết vận hành/CD:

- [docs/ci-cd.md](docs/ci-cd.md)
- [.github/CICD_SETUP.md](.github/CICD_SETUP.md)

## References

- [Rsbuild docs](https://rsbuild.rs)
- [Rsbuild env vars](https://rsbuild.rs/guide/advanced/env-vars)
- [Storybook Rsbuild](https://storybook.rsbuild.rs)
