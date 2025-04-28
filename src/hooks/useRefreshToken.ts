import axios from "../api/axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    console.log("🔄 refreshing");
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
        userFunds: response.data.userFunds,
        userGroups: response.data.userGroups,
      });
      return response.data.accessToken;
    } catch (err) {
      console.error("⛔ Refresh error", err);
      throw err;
    }
  };
  return refresh;
};

export default useRefreshToken;
