# CI/CD Guide

Tài liệu này mô tả pipeline CI/CD hiện tại của frontend theo cấu hình đang có trong repository.

## Tổng quan

- CI tự động chạy khi `pull_request` và `push` lên branch `main`.
- CD production chạy thủ công bằng `workflow_dispatch`.
- Deploy production dùng Vercel CLI trong GitHub Actions.

## File workflow đang dùng

- `/.github/workflows/ci.yml`
- `/.github/workflows/cd.yml`

## CI: kiểm tra chất lượng mã

Workflow `CI` chạy các bước:

1. Checkout source.
2. Setup Bun.
3. Restore/cache Bun dependency.
4. `bun install --frozen-lockfile`.
5. `bun run lint`.
6. `bun run format`.
7. `bun run typecheck`.

Mục tiêu: chặn merge khi code không đạt chuẩn lint/format/typecheck.

## CD: deploy production thủ công

Workflow `CD`:

- Trigger: `workflow_dispatch`.
- Chỉ chạy khi ref là `refs/heads/main`.
- Các bước chính:
  - `bun install --frozen-lockfile`
  - `bunx vercel@latest pull --yes --environment=production`
  - `bunx vercel@latest build --prod`
  - `bunx vercel@latest deploy --prebuilt --prod`

## Secrets bắt buộc

Thiết lập tại GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Nếu thiếu một trong ba secret trên, workflow CD sẽ fail.

## Cấu hình Vercel trong repo

`vercel.json` hiện tại:

- `installCommand`: `bun install`
- `buildCommand`: `bun run build:all`
- `outputDirectory`: `dist`
- `git.deploymentEnabled.main`: `false` để tắt auto deploy trực tiếp từ Git integration
- Có route phục vụ Storybook tại `/storybook`
- Có SPA fallback về `/index.html`

## Quy trình release đề xuất

1. Tạo PR vào `main`.
2. Đảm bảo workflow CI pass.
3. Merge PR vào `main`.
4. Vào tab Actions, chạy thủ công workflow `CD`.
5. Kiểm tra deployment production trên Vercel.

## Checklist khi CD lỗi

- Kiểm tra đủ 3 secrets `VERCEL_*`.
- Kiểm tra workflow chạy từ branch `main`.
- Kiểm tra lockfile và dependency (`bun.lock`) đồng bộ.
- Kiểm tra biến môi trường production trên Vercel đã cấu hình đúng.
