# CI/CD Guide

Tài liệu này mô tả luồng CI/CD chuẩn cho frontend project, bao gồm phần cấu hình ngoài mã nguồn (GitHub + Vercel) và quy trình deploy production an toàn.

## Mục tiêu

- CI chạy tự động cho pull request và push lên `main`.
- Production deploy chạy thủ công qua GitHub Actions.
- Tránh auto-deploy production ngoài kiểm soát.

## Tổng quan pipeline

```text
PR / Push -> GitHub Actions (CI) -> Lint + Typecheck + Build checks
Main branch (manual trigger) -> GitHub Actions (Deploy Manual) -> Vercel production
```

## 1) Thiết lập GitHub secrets

Vào `Settings -> Secrets and variables -> Actions -> New repository secret`, tạo:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Các secret này được workflow deploy dùng để gọi `vercel pull/build/deploy`.

## 2) Thiết lập branch protection cho `main`

Vào `Settings -> Branches -> Add rule` và cấu hình:

- Branch pattern: `main`
- Bật `Require a pull request before merging`
- Bật `Require status checks to pass before merging`
- Chọn check từ workflow CI:
  - `Lint, Format Check, Typecheck`
- Bật `Require branches to be up to date before merging` (khuyến nghị)
- `Restrict who can push to matching branches` theo policy team

## 3) Cấu hình Vercel

Trong Vercel project:

- `Settings -> Git`
- Tắt auto production deploy từ branch `main`

Mục tiêu: production chỉ được phát hành qua workflow manual trên GitHub.

## 4) Quy trình deploy production

Khi cần deploy:

1. Vào tab `Actions` của repository.
2. Chọn workflow `Deploy Manual`.
3. Bấm `Run workflow`.
4. Chọn branch `main`.
5. Xác nhận chạy.

Workflow dự kiến thực thi:

- cài dependencies
- `vercel pull`
- `vercel build`
- `vercel deploy --prebuilt --prod`

## 5) Checklist vận hành

- CI fail thì không merge được vào `main`.
- Push lên `main` không tự deploy production.
- `Deploy Manual` chạy thành công và tạo production deployment.
- URL production hoạt động bình thường sau deploy.

## Troubleshooting nhanh

- **Thiếu secret**: kiểm tra 3 biến `VERCEL_*` đã có trong repo secrets.
- **Deploy sai project Vercel**: kiểm tra lại `VERCEL_ORG_ID` và `VERCEL_PROJECT_ID`.
- **Build fail trên CI nhưng local pass**: đồng bộ Node/Bun version theo `package.json -> engines`.
