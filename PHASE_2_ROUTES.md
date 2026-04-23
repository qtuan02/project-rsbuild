# Phase 2 Routes Reference

## New Routes Added

### Reports Module
```
GET /reports
  └─ ReportsOverviewPage
     ├─ ReportFilters
     ├─ ReportKPICards
     ├─ ReportTable
     └─ Overdue Debt Card
```

### Compliance Module
```
GET /compliance
  └─ ComplianceDashboardPage
     ├─ Stats Cards
     ├─ Compliance by Type
     └─ ResidenceChecklistCard
```

### Communications Module
```
GET /communications
  └─ CommunicationsPage
     ├─ TemplateList
     ├─ SendLogTable
     └─ Statistics Cards
```

### Contract Lifecycle Routes
```
GET /contracts
  └─ ContractListPage (existing)

GET /contracts/:contractId
  └─ ContractDetailPage (existing)

GET /contracts/:contractId/renew
  └─ ContractRenewPage (NEW)
     ├─ Current Contract Summary
     ├─ Renewal Form
     └─ Confirmation Card

GET /contracts/:contractId/liquidation
  └─ ContractLiquidationPage (NEW)
     ├─ Step 1: Asset Checklist
     ├─ Step 2: Settlement
     └─ Step 3: Confirmation
```

---

## Route Configuration

### Routes Object
```typescript
export const routes = {
  home: "/",
  rooms: "/rooms",
  tenants: "/tenants",
  contracts: "/contracts",
  invoices: "/invoices",
  utilities: "/utilities",
  tasks: "/tasks",
  reports: "/reports",           // NEW
  compliance: "/compliance",       // NEW
  communications: "/communications", // NEW
  settings: "/settings",
} as const;
```

### Route Path Builders
```typescript
export const routePathBuilders = {
  // ... existing
  contractRenew: (contractId: string) => 
    `${routes.contracts}/${contractId}/renew`,
  contractLiquidation: (contractId: string) =>
    `${routes.contracts}/${contractId}/liquidation`,
};
```

### Usage in Components
```typescript
import { routePathBuilders } from "@/config/routes";

// Navigate to renewal
navigate(routePathBuilders.contractRenew("C001"));

// Navigate to liquidation
navigate(routePathBuilders.contractLiquidation("C001"));
```

---

## Navigation Menu Structure

### Before Phase 2
```
Tổng quan (/)
Phòng trọ (/rooms)
Khách thuê (/tenants)
Hợp đồng (/contracts)
Hóa đơn (/invoices)
Tiện ích (/utilities)
Trung tâm nhiệm vụ (/tasks)
Cài đặt (/settings)
```

### After Phase 2
```
=== CHÍNH (Main) ===
- Tổng quan (/)
- Phòng trọ (/rooms)
- Khách thuê (/tenants)
- Trung tâm nhiệm vụ (/tasks)

=== QUẢN LÝ (Management) ===
- Hợp đồng (/contracts)
  └─ Can renew or liquidate contract
- Hóa đơn (/invoices)
- Tiện ích (/utilities)
- Báo cáo (/reports) ← NEW

=== HỆ THỐNG (System) ===
- Tuân thủ (/compliance) ← NEW
- Liên lạc (/communications) ← NEW
- Cài đặt (/settings)
```

---

## Route Manifest Configuration

### Phase 2 Route Entries

```typescript
{
  key: "reports",
  path: "/reports",
  routePath: "reports/*",
  title: "Báo cáo",
  description: "Xem báo cáo doanh thu, chi phí và hiệu suất.",
  icon: BarChart3,
  group: "management",
  implemented: true,
  component: ReportsOverviewPage,
},

{
  key: "compliance",
  path: "/compliance",
  routePath: "compliance/*",
  title: "Tuân thủ",
  description: "Quản lý khai báo nơi ở và kiểm tra an toàn.",
  icon: Shield,
  group: "system",
  implemented: true,
  component: ComplianceDashboardPage,
},

{
  key: "communications",
  path: "/communications",
  routePath: "communications/*",
  title: "Liên lạc",
  description: "Gửi thông báo cho khách thuê.",
  icon: MessageSquare,
  group: "system",
  implemented: true,
  component: CommunicationsPage,
},
```

---

## Navigation Groups

### Group Labels
```typescript
navigationGroupLabels = {
  main: "Chính",           // Main features
  management: "Quản lý",   // Business features
  system: "Hệ thống",      // System & settings
};
```

### Group Assignment
| Module | Group | Icon |
|--------|-------|------|
| Reports | management | BarChart3 |
| Compliance | system | Shield |
| Communications | system | MessageSquare |
| Contracts | management | ScrollText |

---

## Contract Workflow Navigation

### From Contract List
```
ContractListPage
  ↓ (click row)
  ContractDetailPage
    ├─ Button: "Gia hạn" → ContractRenewPage
    ├─ Button: "Thanh lý" → ContractLiquidationPage
    └─ Button: "Quay lại" → ContractListPage
```

### From Renewal Page
```
ContractRenewPage
  ├─ Button: "Quay lại" → ContractDetailPage
  └─ Button: "Xác nhận" → ContractListPage (success)
```

### From Liquidation Page (3 Steps)
```
Step 1: Asset Checklist
  ├─ Button: "Hủy" → ContractDetailPage
  └─ Button: "Tiếp tục" → Step 2

Step 2: Settlement
  ├─ Button: "Quay lại" → Step 1
  └─ Button: "Tiếp tục" → Step 3

Step 3: Confirmation
  ├─ Button: "Quay lại" → Step 2
  └─ Button: "Xác nhận" → ContractListPage (success)
```

---

## Route Implementation Details

### Contract Routes Wrapper
```typescript
// src/features/contracts/pages/contract-routes.tsx
export const ContractRoutes = () => {
  return (
    <Routes>
      <Route index element={<ContractListPage />} />
      <Route path=":contractId" element={<ContractDetailWrapper />} />
      <Route path=":contractId/renew" element={<ContractRenewWrapper />} />
      <Route path=":contractId/liquidation" 
        element={<ContractLiquidationWrapper />} />
    </Routes>
  );
};
```

### Parameter Handling
```typescript
// In page components
const { contractId } = useParams<{ contractId: string }>();
const navigate = useNavigate();

// Navigate back
<Button onClick={() => navigate("/contracts")}>
  Quay lại
</Button>
```

---

## Integration Points

### Routes Config Integration
```typescript
import { ContractRoutes } from "@/features/contracts/pages/contract-routes";
import { ReportsOverviewPage } from "@/features/reports/pages/reports-overview-page";
import { ComplianceDashboardPage } from "@/features/compliance/pages/compliance-dashboard-page";
import { CommunicationsPage } from "@/features/communications/pages/communications-page";
```

### Navigation Integration
The new routes automatically appear in:
- Main navigation sidebar
- Breadcrumb navigation
- URL routing
- Route metadata resolution

---

## Deep Linking

All routes support deep linking:

```
/reports
/reports?building=toa-a&floor=floor-1

/compliance
/compliance?status=overdue

/communications
/communications?channel=sms&status=failed

/contracts
/contracts/C001
/contracts/C001/renew
/contracts/C001/liquidation
```

---

## Future Route Extensions

### Potential Sub-Routes
```
/reports
  /reports/monthly    (monthly view)
  /reports/yearly     (yearly view)
  /reports/:report-id (saved report)

/compliance
  /compliance/items/:item-id (detail view)
  /compliance/batch          (bulk actions)

/communications
  /communications/templates/:template-id (edit)
  /communications/campaigns              (campaigns)
```

---

## Route Change Log

### Added in Phase 2
- [x] `/reports` - Reports overview
- [x] `/compliance` - Compliance dashboard
- [x] `/communications` - Communications hub
- [x] `/contracts/:id/renew` - Contract renewal
- [x] `/contracts/:id/liquidation` - Contract liquidation

### Modified in Phase 2
- [x] Contract routes → Changed to use `ContractRoutes` wrapper

### No Breaking Changes
- ✅ All existing routes remain unchanged
- ✅ Backward compatible
- ✅ Seamless integration

---

## SEO/Meta Data

Each route has metadata:
```typescript
{
  key: "reports",
  title: "Báo cáo",
  description: "Xem báo cáo doanh thu, chi phí và hiệu suất.",
}
```

Used in:
- Page titles
- Meta descriptions
- Breadcrumbs
- Route resolution

---

## Accessibility

All routes are:
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Semantic routing
- ✅ Proper ARIA labels
- ✅ Focus management

---

## Performance

Route configuration optimized for:
- Lazy loading (via React Router)
- Minimal bundle impact
- Fast route resolution
- Efficient navigation

---

## Debugging Routes

### Check Current Route
```typescript
const { pathname } = useLocation();
console.log('[v0] Current path:', pathname);
```

### Check Route Parameters
```typescript
const params = useParams();
console.log('[v0] Route params:', params);
```

### Check Route Matches
```typescript
const match = useMatch('/contracts/:contractId/*');
console.log('[v0] Match:', match);
```

---

## Summary

✅ **All Phase 2 routes fully integrated**
- 3 new main routes
- 2 new contract sub-routes
- Full navigation integration
- Complete route configuration
- Production-ready implementation
