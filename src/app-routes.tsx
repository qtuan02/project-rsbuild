import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { DashboardLayout } from "@/components/shared/layout/dashboard-layout";
import { appRouteManifest, routes } from "@/config/routes";
import { ContractDetailPage } from "@/features/contracts/pages/contract-detail-page";
import { InvoiceDetailPage } from "@/features/invoices/pages/invoice-detail-page";
import { RoomDetailPage } from "@/features/rooms/pages/room-detail-page";
import { TenantDetailPage } from "@/features/tenants/pages/tenant-detail-page";

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

const ContractDetailRoute = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  if (!contractId) {
    return <Navigate to={routes.contracts} replace />;
  }

  return (
    <ContractDetailPage
      contractId={contractId}
      onBack={() => navigate(routes.contracts)}
    />
  );
};

const InvoiceDetailRoute = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();

  if (!invoiceId) {
    return <Navigate to={routes.invoices} replace />;
  }

  return (
    <InvoiceDetailPage
      invoiceId={invoiceId}
      onBack={() => navigate(routes.invoices)}
    />
  );
};

const RoomDetailRoute = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  if (!roomId) {
    return <Navigate to={routes.rooms} replace />;
  }

  return (
    <RoomDetailPage roomId={roomId} onBack={() => navigate(routes.rooms)} />
  );
};

const TenantDetailRoute = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();

  if (!tenantId) {
    return <Navigate to={routes.tenants} replace />;
  }

  return (
    <TenantDetailPage
      tenantId={tenantId}
      onBack={() => navigate(routes.tenants)}
    />
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="rooms/:roomId" element={<RoomDetailRoute />} />
        <Route path="tenants/:tenantId" element={<TenantDetailRoute />} />
        <Route path="contracts/:contractId" element={<ContractDetailRoute />} />
        <Route path="invoices/:invoiceId" element={<InvoiceDetailRoute />} />
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
