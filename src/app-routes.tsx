import { Route, Routes } from "react-router-dom";

import { DashboardLayout } from "@/components/shared/layout/dashboard-layout";
import { appRouteManifest } from "@/config/routes";

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
        {appRouteManifest.map((routeItem) => {
          const RouteComponent = routeItem.component;
          const element =
            routeItem.implemented && RouteComponent ? (
              <RouteComponent />
            ) : (
              <ComingSoonPlaceholder title={routeItem.comingSoonTitle ?? ""} />
            );

          if (routeItem.key === "home") {
            return <Route key={routeItem.key} index element={element} />;
          }

          return (
            <Route
              key={routeItem.key}
              path={routeItem.routePath}
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
