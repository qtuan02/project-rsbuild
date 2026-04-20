import { Route, Routes } from 'react-router-dom';

import { DashboardLayout } from '@/components/shared/layout/dashboard-layout';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { RoomListPage } from '@/features/rooms/pages/room-list-page';

const ComingSoonPlaceholder = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <span className="text-lg">🚧</span>
      </div>
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Tính năng này đang được phát triển. Vui lòng quay lại sau.
      </p>
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="rooms/*" element={<RoomListPage />} />
        <Route
          path="tenants/*"
          element={<ComingSoonPlaceholder title="Quản lý khách thuê" />}
        />
        <Route
          path="contracts/*"
          element={<ComingSoonPlaceholder title="Quản lý hợp đồng" />}
        />
        <Route
          path="invoices/*"
          element={<ComingSoonPlaceholder title="Quản lý hóa đơn" />}
        />
        <Route
          path="settings/*"
          element={<ComingSoonPlaceholder title="Cài đặt hệ thống" />}
        />
        <Route
          path="*"
          element={<ComingSoonPlaceholder title="Không tìm thấy trang" />}
        />
      </Route>
    </Routes>
  );
};
