# Architecture Guide

Tài liệu này mô tả kiến trúc code frontend ở mức thực thi (implementation-level), dùng cho dev khi đọc/sửa code hằng ngày.

## Mục tiêu kiến trúc

- Tách rõ trách nhiệm theo layer để dễ bảo trì.
- Tăng khả năng tái sử dụng qua `components/shared`, `libs`, `types`.
- Hạn chế coupling giữa các feature.
- Giữ code nhất quán theo convention dự án.

## Cấu trúc thư mục chính (chi tiết)

```text
src/
  main.tsx                    # entrypoint mount React app
  app.tsx                     # app-level providers (theme/query/router/toast)
  app-routes.tsx              # route composition toàn app
  globals.css                 # global styles + design tokens

  config/
    app.ts                    # app constants/config runtime
    env.ts                    # env parsing + validation
    routes.ts                 # route paths/builders/source-of-truth

  features/                   # nghiệp vụ chia theo bounded context
    <feature>/               # ví dụ: rooms, tenants, contracts, invoices...
      pages/                 # route-level screen composition (wiring UI + hook)
      components/            # presentational components đặc thù feature
      hooks/                 # orchestration state/async/actions cho feature
      domain/                # pure business logic (rules, filters, mapping, stats)
      data/                  # repository/api/mock mapping (data access layer)
      constants/             # optional: constants nội bộ feature nếu cần

  components/
    ui/                       # shadcn/radix primitives (Button, Card, Input...)
    shared/                   # reusable app-level widgets
      badges/                # shared status/semantic badges
      cards/                 # info/summary cards dùng đa màn
      dialogs/               # confirm/action dialogs dùng chung
      filters/               # shared filter/search toolkits
      navigation/            # shared navigation controls (vd. back button)
      pagination/            # pagination widgets/contracts
      panels/                # loading/empty/error reusable panels
      table/                 # reusable data-table ecosystem
    stories/                  # Storybook stories (docs/testing UI)

  hooks/                      # global hooks dùng đa feature (không thuộc 1 nghiệp vụ)
  libs/                       # framework-agnostic helpers/utilities
  types/                      # shared domain contracts/types toàn app
  utils/                      # runtime helpers (format, parse, app-specific helpers)
```

### Note theo từng cụm trong structure

| Path | Vai trò | Khi nào dùng |
| --- | --- | --- |
| `src/main.tsx` | Bootstrap ứng dụng | Chỉ sửa khi thay đổi cách mount app |
| `src/app.tsx` | App providers | Thêm/bỏ provider global (query, theme, toaster...) |
| `src/app-routes.tsx` | Route composition | Đăng ký màn hình/route mới |
| `src/config/routes.ts` | Route source-of-truth | Thêm path/builder, tránh hardcode đường dẫn |
| `src/features/<feature>/pages` | Route-level composition | Tạo màn hình mới, wiring hook + component |
| `src/features/<feature>/hooks` | Orchestration layer | Xử lý state, async flow, actions |
| `src/features/<feature>/domain` | Pure business logic | Filter rules, validators, status maps, stats |
| `src/features/<feature>/data` | Data access layer | Repository/API mapping/mock gateway |
| `src/features/<feature>/components` | Feature UI | Presentational component đặc thù feature |
| `src/components/ui` | UI primitives | Button/Input/Card... base components |
| `src/components/shared` | Reusable app patterns | Dùng lại từ 2+ feature (table/filter/panel/dialog/nav) |
| `src/libs` | Framework-agnostic helpers | Utility thuần, không dính business cụ thể |
| `src/types` | Shared contracts | Type/interface dùng đa feature |
| `src/utils` | Runtime helpers | Format/parse/helper gắn với app runtime |

> Quy tắc nhanh: code dùng 1 feature thì để trong feature; dùng nhiều feature mới promote lên `shared/libs/types`.

### Notes cho structure

- `features/*` là bounded context theo nghiệp vụ.
  - Mỗi feature tự quản lý vòng đời code của chính nó (`pages/hooks/domain/data/components`).
  - Không gom kiểu global `src/pages`, `src/services`, `src/reducers` vì sẽ tăng coupling theo thời gian.

- Không bắt buộc mọi feature có đủ tất cả thư mục.
  - Feature đơn giản có thể chỉ cần `pages + components`.
  - Chỉ tạo `hooks/domain/data` khi thật sự có orchestration/business logic/integration.

- `pages` chỉ là lớp compose màn hình.
  - Nên chứa: route params, layout sections, wiring giữa component + hook.
  - Không nên chứa: lọc dữ liệu phức tạp, gọi repository trực tiếp, mapping business rules.

- `hooks` là lớp điều phối chính.
  - Chịu trách nhiệm: async flow, local state, event handlers, derived UI state.
  - Trả về API ổn định cho page/component (vd: `data`, `isLoading`, `error`, `actions`).
  - Tránh để hook phụ thuộc trực tiếp vào component.

- `domain` chỉ chứa pure logic.
  - Ví dụ phù hợp: `status config`, `filter predicate`, `stat calculators`, `format rule nghiệp vụ`.
  - Ví dụ không phù hợp: `useState`, `useEffect`, `navigate`, `toast`, API calls.

- `data` chỉ xử lý nguồn dữ liệu.
  - Chứa repository, DTO mapping, API/mock gateway.
  - Không import UI/component; không viết render logic ở layer này.

- `components/shared` là nơi đặt reusable patterns đã chuẩn hóa.
  - Chỉ đưa vào shared khi pattern dùng lại từ 2 feature trở lên.
  - Ví dụ: table toolkit, filter toolbar, panels, dialog chuẩn, back-button chuẩn.

- `features/<name>/index.ts` là public entry cho cross-feature usage.
  - Feature khác chỉ import qua entry này.
  - Không import thẳng nội bộ như `@/features/x/data/*` hoặc `@/features/x/domain/*` nếu không thật sự bắt buộc.

- `config/routes.ts` là source-of-truth cho route paths/builders.
  - Không hardcode path string trong feature (`"/tenants/123"`).
  - Luôn dùng `routePathBuilders.*` để an toàn khi đổi route.

- `hooks/`, `libs/`, `utils/`, `types/` ở root chỉ chứa thứ dùng đa feature.
  - Nếu logic chỉ phục vụ 1 feature, ưu tiên để trong feature đó.
  - Mục tiêu: tránh root-level thành “misc dump”.

- Luồng phụ thuộc chuẩn cần giữ nhất quán:

```text
page -> feature hook -> domain/data
component -> (props) -> page/hook
shared component -> không phụ thuộc feature-specific code
```

## Layering rules (bắt buộc)

- Luồng phụ thuộc chuẩn: `pages -> hooks -> domain/data`.
- `pages`:
  - chỉ làm route composition + screen wiring.
  - không chứa business logic phức tạp nếu có thể đưa xuống hook/domain.
- `hooks`:
  - orchestration state, async flow, UI actions.
  - expose API rõ ràng cho page/component dùng.
- `domain`:
  - pure logic, không React, không side effects network.
  - nơi đặt filter logic, parser, mapping rule, stats.
- `data`:
  - repository/API calls, mapping DTO.
  - không render UI.
- `components`:
  - ưu tiên presentational.
  - không gọi API trực tiếp.

## Shared code policy

- Ưu tiên reuse trước khi tạo mới.
- Nếu logic/UI dùng từ 2 feature trở lên:
  - UI widget: đưa vào `components/shared`.
  - Utility thuần: đưa vào `libs`.
  - Contract/type chung: đưa vào `types`.
- Không import trực tiếp nội bộ `data` của feature khác nếu chưa có public entry phù hợp.

## Routing conventions

- Source-of-truth cho path nằm ở `src/config/routes.ts`.
- App route tree khai báo tại `src/app-routes.tsx`.
- Khi thêm route mới:
  1. thêm path/builder vào `routes.ts`
  2. khai báo route component tại `app-routes.tsx`
  3. cập nhật navigation/menu nếu cần

## State và data-fetching conventions

- Server state: TanStack Query.
- Form state: React Hook Form + schema validation (nếu có).
- UI local state: React state/hook tại feature.
- Tránh duplicate state cùng nguồn dữ liệu ở nhiều nơi.

## UI conventions

- Base primitives: `components/ui` (Radix/shadcn).
- Pattern dùng chung (table/filter/panel/dialog): `components/shared`.
- Thiết kế mobile-first: không phụ thuộc hover cho hành động quan trọng.
- Action chính (vd. xem detail) phải luôn truy cập được trên mobile.

### UI reuse guardrails

- List pages ưu tiên dùng:
  - `ListPageHeader`,
  - `GridTableSwitch`,
  - `DataTableToolbar`,
  - `DataTablePagination`,
  - `DataTableView` hoặc `DataTable`.
- Không tạo table tay mới nếu dùng được `DataTable` stack.
- Card item đa feature ưu tiên `EntityListCard`; action menu ưu tiên `EntityActionMenu`.
- Detail pages ưu tiên thống nhất theo `DetailPageShell` + `InfoCard/InfoRow`.
- KPI stats ưu tiên `SummaryCard` variants thay vì dựng lại `Card` custom ở từng feature.

## Checklist khi tạo/chỉnh feature mới

1. Xác định business logic nào thuộc `domain`.
2. Viết repository/API ở `data`.
3. Viết hook orchestration trong `hooks`.
4. Page chỉ wiring + compose UI.
5. Trích phần dùng chung ra `components/shared` hoặc `libs` nếu lặp.
6. Chạy `lint` + `typecheck` trước khi tạo PR.

## Liên kết tài liệu liên quan

- [README](../README.md)
- [CI/CD Guide](./ci-cd.md)
- [High-level design](./high-level-design.md)
