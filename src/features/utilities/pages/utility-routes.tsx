import { Route, Routes } from "react-router-dom";

import { UtilityDetailPage } from "./utility-detail-page";
import { UtilityListPage } from "./utility-list-page";

export const UtilityRoutes = () => {
  return (
    <Routes>
      <Route index element={<UtilityListPage />} />
      <Route path=":utilityId" element={<UtilityDetailPage />} />
    </Routes>
  );
};
