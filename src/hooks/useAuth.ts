import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const { auth } = context;

  useDebugValue(auth, (auth) => (auth?.userName ? "Logged In" : "Logged Out"));
  return context;
};
