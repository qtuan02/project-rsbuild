import { Navigate, useLocation, Outlet } from "react-router-dom";

import { routes } from "@/config/routes";
import { useAuthStore } from "@/stores/auth.store";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={routes.authLogin} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};
