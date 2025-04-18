import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
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
        isMounted && setIsLoading(false);
      }
    };

    if (!auth?.accessToken) {
      if (persist) {
        verifyRefreshToken();
      } else {
        setIsLoading(false);
      }
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
    <div className="spinner-wrapper">
      <div className="spinner"></div>
    </div>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
