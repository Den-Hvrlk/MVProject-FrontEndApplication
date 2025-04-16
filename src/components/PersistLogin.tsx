import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import axios from "../api/axios";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        const response = await axios.post("/auth/refresh", null, {
          withCredentials: true,
        });

        setAuth({
          id: response.data.id,
          accessToken: response.data.accessToken,
          email: response.data.email,
          roles: response.data.roles,
          userName: response.data.userName,
        });
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

  useEffect(() => {
    console.log("Auth was updated:", auth);
  }, [auth]);

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
