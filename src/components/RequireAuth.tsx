import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth: React.FC = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth.email ? (
    <Outlet />
  ) : (
    <Navigate to="/Auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
