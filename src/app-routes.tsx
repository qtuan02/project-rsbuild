import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { AuthLayout } from "@/components/shared/layout/auth-layout";
import { DashboardLayout } from "@/components/shared/layout/dashboard-layout";
import { ProtectedRoute } from "@/components/shared/layout/protected-route";
import { appRouteManifest, routePatterns, routes } from "@/config/routes";
import { LoginPage } from "@/features/auth/pages/login-page";
import { RegisterPage } from "@/features/auth/pages/register-page";
import { getBuildingOptions } from "@/features/buildings/data/building.repository";
import { BuildingDetailPage } from "@/features/buildings/pages/building-detail-page";
import { ContractCreatePage } from "@/features/contracts/pages/contract-create-page";
import { ContractDetailPage } from "@/features/contracts/pages/contract-detail-page";
import { ContractLiquidationPage } from "@/features/contracts/pages/contract-liquidation-page";
import { ContractRenewPage } from "@/features/contracts/pages/contract-renew-page";
import { ExpenseDetailPage } from "@/features/expenses/pages/expense-detail-page";
import { BatchInvoicePage } from "@/features/invoices/pages/batch-invoice-page";
import { InvoiceDetailPage } from "@/features/invoices/pages/invoice-detail-page";
import { OnboardingWizardPage } from "@/features/onboarding/pages/onboarding-wizard-page";
import { RoomDetailPage } from "@/features/rooms/pages/room-detail-page";
import { SupplierBillDetailPage } from "@/features/supplier-bills/pages/supplier-bill-detail-page";
import { TenantCreatePage } from "@/features/tenants/pages/tenant-create-page";
import { TenantDetailPage } from "@/features/tenants/pages/tenant-detail-page";
import { MeterInputPage } from "@/features/utilities/pages/meter-input-page";
import { UtilityDetailPage } from "@/features/utilities/pages/utility-detail-page";

const RoomDetailRoute = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  if (!roomId) return null;

  return (
    <RoomDetailPage roomId={roomId} onBack={() => navigate(routes.rooms)} />
  );
};

const BuildingDetailRoute = () => {
  const { buildingId } = useParams<{ buildingId: string }>();
  if (!buildingId) return null;

  return <BuildingDetailPage buildingId={buildingId} />;
};

const TenantDetailRoute = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  if (!tenantId) return null;

  return (
    <TenantDetailPage
      tenantId={tenantId}
      onBack={() => navigate(routes.tenants)}
    />
  );
};

const ContractDetailRoute = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  if (!contractId) return null;

  return (
    <ContractDetailPage
      contractId={contractId}
      onBack={() => navigate(routes.contracts)}
    />
  );
};

const ContractRenewRoute = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  if (!contractId) return null;

  return (
    <ContractRenewPage
      contractId={contractId}
      onBack={() => navigate(routes.contracts)}
    />
  );
};

const ContractLiquidationRoute = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  if (!contractId) return null;

  return (
    <ContractLiquidationPage
      contractId={contractId}
      onBack={() => navigate(routes.contracts)}
    />
  );
};

const InvoiceDetailRoute = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  if (!invoiceId) return null;

  return (
    <InvoiceDetailPage
      invoiceId={invoiceId}
      onBack={() => navigate(routes.invoices)}
    />
  );
};

const SupplierBillDetailRoute = () => {
  const { billId } = useParams<{ billId: string }>();
  if (!billId) return null;

  return <SupplierBillDetailPage billId={billId} />;
};

const ExpenseDetailRoute = () => {
  const { expenseId } = useParams<{ expenseId: string }>();
  if (!expenseId) return null;

  return <ExpenseDetailPage expenseId={expenseId} />;
};

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
  const buildingOptions = getBuildingOptions();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={routes.authLogin} element={<LoginPage />} />
        <Route path={routes.authRegister} element={<RegisterPage />} />
      </Route>
      <Route path={routes.onboarding} element={<OnboardingWizardPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout buildingOptions={buildingOptions} />}>
          {appRouteManifest.map((routeItem) => {
            const RouteComponent = routeItem.component;
            const element =
              routeItem.isImplemented && RouteComponent ? (
                <RouteComponent />
              ) : (
                <ComingSoonPlaceholder
                  title={routeItem.comingSoonTitle ?? ""}
                />
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
            path={routePatterns.buildingDetail}
            element={<BuildingDetailRoute />}
          />
          <Route
            path={routePatterns.roomDetail}
            element={<RoomDetailRoute />}
          />
          <Route
            path={routePatterns.tenantCreate}
            element={<TenantCreatePage />}
          />
          <Route
            path={routePatterns.tenantDetail}
            element={<TenantDetailRoute />}
          />
          <Route
            path={routePatterns.contractCreate}
            element={<ContractCreatePage />}
          />
          <Route
            path={routePatterns.contractDetail}
            element={<ContractDetailRoute />}
          />
          <Route
            path={routePatterns.contractRenew}
            element={<ContractRenewRoute />}
          />
          <Route
            path={routePatterns.contractLiquidation}
            element={<ContractLiquidationRoute />}
          />
          <Route
            path={routePatterns.invoiceBatch}
            element={<BatchInvoicePage />}
          />
          <Route
            path={routePatterns.invoiceDetail}
            element={<InvoiceDetailRoute />}
          />
          <Route
            path={routePatterns.supplierBillDetail}
            element={<SupplierBillDetailRoute />}
          />
          <Route
            path={routePatterns.expenseDetail}
            element={<ExpenseDetailRoute />}
          />
          <Route path={routePatterns.meterInput} element={<MeterInputPage />} />
          <Route
            path={routePatterns.utilityDetail}
            element={<UtilityDetailPage />}
          />
          <Route
            path={routePatterns.notFound}
            element={<ComingSoonPlaceholder title="Không tìm thấy trang" />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
