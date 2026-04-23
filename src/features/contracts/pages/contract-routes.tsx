import { Route, Routes, useParams, useNavigate } from "react-router-dom";

import { ErrorPanel } from "@/components/shared/panels";
import { routes, routePathBuilders } from "@/config/routes";

import { ContractDetailPage } from "./contract-detail-page";
import { ContractLiquidationPage } from "./contract-liquidation-page";
import { ContractListPage } from "./contract-list-page";
import { ContractRenewPage } from "./contract-renew-page";

const invalidContractPanel = (navigate: ReturnType<typeof useNavigate>) => (
  <ErrorPanel
    title="Không hợp lệ"
    description="Thiếu mã hợp đồng trong đường dẫn."
    action={{
      label: "Về danh sách hợp đồng",
      onClick: () => navigate(routes.contracts),
    }}
  />
);

const ContractDetailWrapper = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  if (!contractId) {
    return invalidContractPanel(navigate);
  }

  return (
    <ContractDetailPage
      contractId={contractId}
      onBack={() => navigate(routes.contracts)}
    />
  );
};

const ContractRenewWrapper = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  if (!contractId) {
    return invalidContractPanel(navigate);
  }

  return (
    <ContractRenewPage
      contractId={contractId}
      onBack={() => navigate(routePathBuilders.contractDetail(contractId))}
    />
  );
};

const ContractLiquidationWrapper = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  if (!contractId) {
    return invalidContractPanel(navigate);
  }

  return (
    <ContractLiquidationPage
      contractId={contractId}
      onBack={() => navigate(routePathBuilders.contractDetail(contractId))}
    />
  );
};

export const ContractRoutes = () => {
  return (
    <Routes>
      <Route index element={<ContractListPage />} />
      <Route path=":contractId" element={<ContractDetailWrapper />} />
      <Route path=":contractId/renew" element={<ContractRenewWrapper />} />
      <Route
        path=":contractId/liquidation"
        element={<ContractLiquidationWrapper />}
      />
    </Routes>
  );
};
