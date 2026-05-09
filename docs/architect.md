# Architecture Guide

Tài liệu này mô tả kiến trúc frontend ở mức triển khai mã nguồn để dev onboarding nhanh và sửa code đúng lớp.

## Mục tiêu

- Tách trách nhiệm rõ ràng theo layer.
- Giảm coupling giữa các module nghiệp vụ.
- Tăng tái sử dụng thông qua `components/shared`, `libs`, `types`.
- Dễ mở rộng feature mới mà không phá cấu trúc hiện tại.

## Bản đồ mã nguồn

```text
src/
  main.tsx
  app.tsx
  app-routes.tsx
  globals.css

  config/
    app.ts
    colors.ts
    env.ts
    routes.ts

  features/<feature>/
    pages/
    components/
    hooks/
    domain/
    data/
    constants/        # tùy chọn

  components/ui/
  components/shared/
  hooks/
  libs/
  stores/
  types/
  utils/
```

## Layering rules

- Luồng phụ thuộc chuẩn: `pages -> hooks -> domain/data`.
- `pages`: compose màn hình theo route, wiring component và hook.
- `hooks`: điều phối state, async flow, handlers cho UI.
- `domain`: logic nghiệp vụ thuần, không React, không network side effects.
- `data`: repository, mapping DTO, tích hợp API/mock.
- `components`: render theo props; không gọi API trực tiếp.

## Routing conventions

- Nguồn sự thật cho path và metadata route nằm ở `src/config/routes.ts`.
- Route tree app khai báo ở `src/app-routes.tsx`.
- Không hardcode path string trong feature nếu đã có `routes` hoặc `routePathBuilders`.

Khi thêm route mới:

1. Thêm path/pattern trong `src/config/routes.ts`.
2. Đăng ký route element ở `src/app-routes.tsx`.
3. Cập nhật manifest điều hướng nếu route cần xuất hiện trong sidebar/menu.

## Shared code policy

- Code chỉ dùng trong 1 feature: giữ trong feature đó.
- Code dùng lại từ 2 feature trở lên:
  - UI pattern: đưa vào `components/shared`.
  - Utility thuần: đưa vào `libs` hoặc `utils` phù hợp ngữ cảnh.
  - Contract/type chung: đưa vào `types`.
- Tránh tạo abstraction sớm khi mới có 1 case dùng.

## State và data-fetching

- Server state: TanStack Query.
- HTTP client: `src/libs/http-client.ts`.
- Form lớn: React Hook Form + Zod.
- Tránh mirror dữ liệu query vào state cục bộ nếu không có nhu cầu chỉnh sửa tạm.

## UI conventions

- Base primitive: `components/ui` (shadcn/Radix).
- Pattern tái sử dụng: `components/shared`.
- Ưu tiên component chuẩn trước khi tạo component mới.
- Thiết kế mobile-first, action quan trọng không phụ thuộc hover.

## Checklist khi làm feature

1. Đặt logic nghiệp vụ vào `domain`.
2. Đặt tích hợp dữ liệu vào `data`.
3. Dùng `hooks` để điều phối hành vi UI.
4. Giữ `pages/components` thiên về trình bày và wiring.
5. Tái sử dụng shared components nếu đã có pattern tương đương.
6. Chạy `bun run lint`, `bun run format`, `bun run typecheck` trước khi mở PR.

## Tài liệu liên quan

- [README](../README.md)
- [Danh sách tính năng](./list-features.md)
- [CI/CD guide](./ci-cd.md)
- [High-level design](./high-level-design.md)
