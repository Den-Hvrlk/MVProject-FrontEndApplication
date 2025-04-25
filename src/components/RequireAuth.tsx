import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: number[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuth();

  console.log("🔐 Current user roles:", auth?.roles);
  console.log("🔐 Allowed roles:", allowedRoles);

  const hasAccess = auth?.roles?.some((role) => allowedRoles.includes(role));
  console.log("✅ Access granted?", hasAccess);

  return hasAccess ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
