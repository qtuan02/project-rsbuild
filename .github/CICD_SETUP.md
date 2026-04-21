# CI/CD Setup Guide

Tài liệu này dùng để hoàn tất các bước cấu hình platform (GitHub + Vercel) không thể lưu trong git.

## Mục tiêu pipeline

- CI tự động chạy cho pull request và push lên `main`
- Production deploy chạy thủ công qua GitHub Actions

## 1) Cấu hình GitHub repository secrets

Vào:

- `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`

Tạo các secret:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Các giá trị này được dùng bởi workflow deploy thủ công.

## 2) Bật branch protection cho `main`

Vào:

- `Settings` -> `Branches` -> `Add rule`

Khuyến nghị cấu hình:

- Branch name pattern: `main`
- Bật `Require a pull request before merging`
- Bật `Require status checks to pass before merging`
- Chọn status check từ workflow `CI`:
  - `Lint, Format Check, Typecheck`
- Bật `Require branches to be up to date before merging` (khuyến nghị)
- `Restrict who can push to matching branches` (tùy team policy)

## 3) Tắt auto production deploy từ Vercel Git integration

Vào Vercel project:

- `Settings` -> `Git`
- Tắt auto production deploy từ branch `main`

Mục tiêu: production chỉ được deploy bởi GitHub Actions workflow manual.

## 4) Quy trình deploy production thủ công

Khi cần deploy:

1. Vào tab `Actions` trên GitHub
2. Mở workflow `Deploy Manual`
3. Chọn `Run workflow`
4. Chọn branch `main`
5. Xác nhận chạy

Workflow sẽ thực hiện:

- cài dependency
- `vercel pull`
- `vercel build`
- `vercel deploy --prebuilt --prod`

## 5) Checklist xác nhận sau khi setup

- CI fail thì không merge được vào `main`
- Push vào `main` không tự tạo production deployment trên Vercel
- `Deploy Manual` chạy thành công và tạo production deployment
