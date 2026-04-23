import { Route, Routes, useParams, useNavigate } from "react-router-dom";

import { ContractDetailPage } from "./contract-detail-page";
import { ContractLiquidationPage } from "./contract-liquidation-page";
import { ContractListPage } from "./contract-list-page";
import { ContractRenewPage } from "./contract-renew-page";

const ContractDetailWrapper = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  if (!contractId) {
    return <div>Invalid contract ID</div>;
  }

  return (
    <ContractDetailPage
      contractId={contractId}
      onBack={() => navigate("/contracts")}
    />
  );
};

const ContractRenewWrapper = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  if (!contractId) {
    return <div>Invalid contract ID</div>;
  }

  return (
    <ContractRenewPage
      contractId={contractId}
      onBack={() => navigate(`/contracts/${contractId}`)}
    />
  );
};

const ContractLiquidationWrapper = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  if (!contractId) {
    return <div>Invalid contract ID</div>;
  }

  return (
    <ContractLiquidationPage
      contractId={contractId}
      onBack={() => navigate(`/contracts/${contractId}`)}
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
