import { createContext, useState, ReactNode, useEffect, useMemo } from "react";

interface AuthData {
  id: number;
  userName: string;
  email: string;
  roles: number[];
  accessToken: string;
  userFunds: UserFunds[];
  userGroups: UserGroups[];
}

export type UserFunds = {
  fundId: number;
  fundName: string;
  codeUSR: string;
};

export type UserGroups = {
  groupId: number;
  groupName: string;
};

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

    userFunds: [],
    userGroups: [],
  });

  const [persist, setPersist] = useState<boolean>(() => {
    const stored = localStorage.getItem("persist");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
    console.log("persist", persist);
  }, [persist]);

  const value = useMemo(
    () => ({ auth, setAuth, persist, setPersist }),
    [auth, persist]
  );

  console.log("📦 useAuth:", auth);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
