import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  console.log("🔄 PersistLogin");
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("⚠️ Could not refresh session", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return !persist ? (
    <Outlet />
  ) : isLoading ? (
    <div className="spinner-wrapper" style={{ gap: 5 }}>
      <div className="spinner"></div>
      Refreshing ...
    </div>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
