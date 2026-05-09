# Frontend

Frontend cho hệ thống quản lý vận hành nhà trọ/tòa nhà cho thuê. Dự án dùng React + TypeScript, kiến trúc theo feature, ưu tiên tái sử dụng qua shared components và tách lớp rõ ràng.

## Tài liệu chính

- [README](README.md): onboarding nhanh và quy trình chạy dự án.
- [Kiến trúc triển khai](docs/architect.md): quy ước tổ chức mã nguồn và layering ở mức code.
- [Danh sách tính năng](docs/list-features.md): mô tả tính năng đang có theo từng module.
- [CI/CD](docs/ci-cd.md): pipeline CI, deploy production thủ công qua GitHub Actions + Vercel.
- [High-level design](docs/high-level-design.md): tài liệu thiết kế tổng quan (giữ nguyên theo phân tích nghiệp vụ).

## Công nghệ

- React `19`
- TypeScript (strict)
- Rsbuild
- React Router
- TanStack Query + Axios
- TanStack Table + dnd-kit
- Tailwind CSS + Radix UI + shadcn/ui
- ESLint + Biome

## Yêu cầu môi trường

- Node.js `>=22.21.0`
- Bun `>=1.2.3`

## Chạy dự án local

1. Cài dependency:

```bash
bun install
```

2. Tạo file môi trường:

```bash
cp .env.template .env
```

3. Chạy dev server:

```bash
bun run dev
```

## Biến môi trường

- Dự án dùng biến `PUBLIC_` cho client-side runtime.
- File mẫu: `.env.template`.
- Validate và normalize tại [src/config/env.ts](src/config/env.ts).

Biến đang dùng:

- `PUBLIC_API_BASE_URL`: base URL cho HTTP client.
- `PUBLIC_STORAGE_SECRET_KEY`: khóa mã hóa cục bộ cho utility crypto phía client.

## Scripts

- `bun run dev`: chạy local development server.
- `bun run build`: build production app.
- `bun run start`: chạy dev server qua lệnh `rsbuild start`.
- `bun run preview`: preview bản build.
- `bun run storybook`: chạy Storybook tại cổng `6006`.
- `bun run build-storybook`: build Storybook tĩnh.
- `bun run build:all`: build app + Storybook.
- `bun run lint`: kiểm tra ESLint.
- `bun run lint:fix`: tự sửa lỗi lint có thể auto-fix.
- `bun run format`: kiểm tra format bằng Biome.
- `bun run format:fix`: ghi lại format chuẩn.
- `bun run typecheck`: kiểm tra kiểu với TypeScript.

## Quy trình trước khi mở PR

```bash
bun run lint
bun run format
bun run typecheck
```

Nếu có lỗi format/lint có thể tự sửa:

```bash
bun run format:fix
bun run lint:fix
```

## Tóm tắt cấu trúc mã nguồn

```text
src/
  app-routes.tsx             # khai báo route tree của app
  config/routes.ts           # source-of-truth cho path + manifest điều hướng
  features/<feature>/        # module nghiệp vụ
  components/ui/             # base primitives
  components/shared/         # pattern dùng chung toàn app
  libs/                      # tích hợp thư viện và helper dùng chung
  hooks/                     # global hooks
  stores/                    # Zustand stores
  types/                     # shared contracts
  utils/                     # helper thuần
```

Quy tắc phụ thuộc chính: `page -> hook -> domain/data`.

## Triển khai

- Cấu hình deploy ở [vercel.json](vercel.json).
- Workflow CI: `.github/workflows/ci.yml`.
- Workflow CD (manual production deploy): `.github/workflows/cd.yml`.
- Chi tiết xem tại [docs/ci-cd.md](docs/ci-cd.md).
