import { Route, Routes } from 'react-router-dom';

import { DashboardLayout } from '@/components/shared/layout/dashboard-layout';
import { appRouteConfigs, type AppRouteKey } from '@/config/routes';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { RoomListPage } from '@/features/rooms/pages/room-list-page';
import { TenantListPage } from '@/features/tenants/pages/tenant-list-page';

import type { ReactElement } from 'react';

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
  const implementedRouteElements: Record<AppRouteKey, ReactElement | null> = {
    home: <DashboardPage />,
    rooms: <RoomListPage />,
    tenants: <TenantListPage />,
    contracts: null,
    invoices: null,
    settings: null,
  };

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {appRouteConfigs.map((routeConfig) => {
          const implementedElement = implementedRouteElements[routeConfig.key];
          const element =
            routeConfig.implemented && implementedElement ? (
              implementedElement
            ) : (
              <ComingSoonPlaceholder
                title={routeConfig.comingSoonTitle ?? ''}
              />
            );

          if (routeConfig.key === 'home') {
            return <Route key={routeConfig.key} index element={element} />;
          }

          return (
            <Route
              key={routeConfig.key}
              path={routeConfig.routePath}
              element={element}
            />
          );
        })}
        <Route
          path="*"
          element={<ComingSoonPlaceholder title="Không tìm thấy trang" />}
        />
      </Route>
    </Routes>
  );
};
