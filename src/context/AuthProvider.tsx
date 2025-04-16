import { createContext, useState, ReactNode, useEffect, useMemo } from "react";

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
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
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

  const [persist, setPersist] = useState<boolean>(() => {
    const stored = localStorage.getItem("persist");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
      persist,
      setPersist,
    }),
    [auth, persist]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
