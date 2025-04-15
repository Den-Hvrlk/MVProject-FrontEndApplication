import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../api/axios";

interface AuthData {
  id: number;
  userName: string;
  email: string;
  roles: number[];
  accessToken: string;
}

interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthData>({
    id: 0,
    email: "",
    roles: [],
    accessToken: "",
    userName: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Auth was updated:", auth);
  }, [auth]);

  useEffect(() => {
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
        setLoading(false);
      }
    };

    verifyRefreshToken();
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
