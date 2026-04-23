# Phase 2 Developer Guide

## Project Structure

```
src/features/
├── reports/                          # Reports Module
│   ├── data/
│   │   ├── reports.mock.ts           # Mock data (ReportData, OverdueDebt, P&L)
│   │   └── reports.repository.ts     # Data access layer
│   ├── domain/
│   │   ├── reports-filter-params.ts  # Filter types & defaults
│   │   └── reports-filters.ts        # Filter options (buildings, floors, status)
│   ├── hooks/
│   │   └── use-reports.ts            # Business logic & state management
│   ├── components/
│   │   ├── report-filters.tsx        # Multi-select filters & date picker
│   │   ├── report-kpi-cards.tsx      # Summary cards (4 KPIs)
│   │   └── report-table.tsx          # Detailed data table
│   └── pages/
│       └── reports-overview-page.tsx # Main page
│
├── compliance/                        # Compliance Module
│   ├── data/
│   │   └── compliance.mock.ts        # Mock compliance items
│   ├── components/
│   │   └── residence-checklist-card.tsx # Status tracker
│   └── pages/
│       └── compliance-dashboard-page.tsx # Main page
│
├── communications/                   # Communications Module
│   ├── data/
│   │   └── communications.mock.ts    # Templates & send logs
│   ├── components/
│   │   ├── template-list.tsx         # Template cards with send action
│   │   └── send-log-table.tsx        # Message history table
│   └── pages/
│       └── communications-page.tsx   # Main page
│
└── contracts/
    ├── pages/
    │   ├── contract-routes.tsx       # Routing wrapper (NEW)
    │   ├── contract-renew-page.tsx   # Renewal flow (NEW)
    │   ├── contract-liquidation-page.tsx # Liquidation flow (NEW)
    ├── components/
    │   ├── contract-lifecycle-stepper.tsx # Step indicator (NEW)
    │   ├── liquidation-checklist.tsx # Interactive checklist (NEW)
    │   └── liquidation-summary-card.tsx   # Payment breakdown (NEW)
    └── data/
        ├── contract.mock.ts
        └── contract.repository.ts
```

---

## Data Flow Architecture

### Reports Module Example
```
reports-overview-page.tsx
    └── useReports()                  [Custom Hook]
        ├── getReports()              [API Call]
        └── filters state             [Local State]
    └── Components
        ├── ReportFilters
        ├── ReportKPICards
        └── ReportTable
```

### Component Pattern
```
Page Component
    ↓
Custom Hook (Business Logic)
    ↓
Repository (Data Access)
    ↓
Mock Data
```

---

## Adding a New Feature

### 1. Create Data Layer
```typescript
// features/myfeature/data/myfeature.mock.ts
export interface MyData {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

export const mockData: MyData[] = [/* ... */];

// features/myfeature/data/myfeature.repository.ts
export const getMyData = () => mockData;
```

### 2. Create Hook (if needed)
```typescript
// features/myfeature/hooks/use-myfeature.ts
export const useMyFeature = () => {
  const [filter, setFilter] = useState('all');
  const data = getMyData();
  
  const filtered = data.filter(item => 
    filter === 'all' || item.status === filter
  );
  
  return { data: filtered, filter, setFilter };
};
```

### 3. Create Components
```typescript
// features/myfeature/components/my-component.tsx
export const MyComponent = ({ items }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  );
};
```

### 4. Create Page
```typescript
// features/myfeature/pages/my-page.tsx
export const MyPage = () => {
  const { data, filter, setFilter } = useMyFeature();
  
  return (
    <div className="space-y-6">
      <MyComponent items={data} />
    </div>
  );
};
```

### 5. Add Route
```typescript
// config/routes.ts
import { MyPage } from "@/features/myfeature/pages/my-page";

export const routes = {
  // ...
  myfeature: "/myfeature",
};

export const appRouteManifest = [
  // ...
  {
    key: "myfeature",
    path: routes.myfeature,
    routePath: "myfeature/*",
    title: "My Feature",
    description: "Description",
    icon: IconName,
    group: "management",
    implemented: true,
    component: MyPage,
  },
];
```

---

## Component Guidelines

### UI Components Used
- **Card**: Content containers
- **Badge**: Status indicators
- **Button**: Actions
- **Select**: Dropdowns
- **Input/Textarea**: Forms
- **Alert**: Messages

### Styling Patterns
```typescript
// Responsive grids
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

// Spacing
<div className="space-y-6">

// Status colors
- Green: Success/Completed (bg-green-100 text-green-800)
- Blue: Info/Pending (bg-blue-100 text-blue-800)
- Red: Error/Overdue (bg-red-100 text-red-800)
- Yellow: Warning (bg-yellow-100 text-yellow-800)
```

---

## Hook Pattern Example

```typescript
// Custom hook for business logic
export const useMyData = () => {
  const [filters, setFilters] = useState<FilterParams>({
    status: 'all',
    date: new Date(),
  });

  const data = getMyData().filter(item => {
    if (filters.status !== 'all') {
      return item.status === filters.status;
    }
    return true;
  });

  return {
    data,
    filters,
    setFilters,
    loading: false,
    error: null,
  };
};
```

---

## Testing Mock Data

### Adding More Mock Items
```typescript
// features/module/data/module.mock.ts
export const mockData = [
  {
    id: '1',
    name: 'Item 1',
    // ...
  },
  {
    id: '2',
    name: 'Item 2',
    // ...
  },
];
```

### Modifying Filter Options
```typescript
// features/module/domain/module-filters.ts
export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
```

---

## Performance Optimization

### For Large Datasets (Future)
1. Add pagination
2. Implement virtual scrolling
3. Use React.memo for components
4. Lazy load routes

### Caching Strategy
```typescript
// Could add caching layer
const getCachedData = useMemo(
  () => getMyData(),
  [filters]
);
```

---

## Common Patterns

### Status Badge Pattern
```typescript
const getStatusBadge = (status: string) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-blue-100 text-blue-800',
    overdue: 'bg-red-100 text-red-800',
  };
  
  return <Badge className={colors[status]}>{status}</Badge>;
};
```

### Responsive Grid Pattern
```typescript
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {items.map(item => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

### Form Pattern
```typescript
const [formData, setFormData] = useState({
  field1: '',
  field2: 0,
});

return (
  <form onSubmit={handleSubmit}>
    <Input
      value={formData.field1}
      onChange={(e) => setFormData({
        ...formData,
        field1: e.target.value,
      })}
    />
  </form>
);
```

---

## Debugging Tips

### Check Mock Data
```typescript
// Add to component for debugging
useEffect(() => {
  console.log('[v0] Data:', data);
  console.log('[v0] Filters:', filters);
}, [data, filters]);
```

### Verify Routes
```typescript
// Check console for navigation
console.log('[v0] Current route:', location.pathname);
console.log('[v0] Route params:', params);
```

### Component Props
```typescript
interface MyComponentProps {
  items: MyData[];
  onAction?: (id: string) => void;
  loading?: boolean;
}
```

---

## File Naming Conventions

```
Directories:     kebab-case (my-feature)
Files:           kebab-case (my-component.tsx)
Components:      PascalCase (MyComponent)
Interfaces:      PascalCase (MyComponentProps)
Functions:       camelCase (getMyData)
Constants:       UPPER_SNAKE_CASE (MY_CONSTANT)
Types:           PascalCase (MyType)
```

---

## Import Organization

```typescript
// 1. React and external libraries
import { useState } from "react";

// 2. UI components (blank line before)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 3. Internal components (blank line before)
import { MyComponent } from "../components/my-component";
import { useMyHook } from "../hooks/use-my-hook";

// 4. Data layer (blank line before)
import { getMyData } from "../data/my.repository";
import type { MyData } from "../data/my.mock";
```

---

## Quick Commands

```bash
# Format code
bun run format

# Run linter
bun run lint

# Check types
bun run typecheck

# Build project
bun run build

# Start dev server
bun run dev
```

---

## Resources

- **UI Components**: `src/components/ui/`
- **Shared Components**: `src/components/shared/`
- **Utilities**: `src/utils/`
- **Types**: `src/types/`
- **Config**: `src/config/`

---

## Integration Checklist

When adding a new feature:
- [ ] Create data layer (mock + repository)
- [ ] Create domain/filters if needed
- [ ] Create custom hook for logic
- [ ] Create reusable components
- [ ] Create page component
- [ ] Add route to config
- [ ] Update navigation manifest
- [ ] Test TypeScript compilation
- [ ] Run ESLint
- [ ] Format with Biome
- [ ] Test in browser
