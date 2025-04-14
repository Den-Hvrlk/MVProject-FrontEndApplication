import axios from "../api/axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post("/auth/refresh", null, {
        withCredentials: true,
      });
      setAuth({
        accessToken: response.data.accessToken,
        email: response.data.email,
        userName: response.data.userName,
      });
      return response.data.accessToken;
    } catch (err) {
      console.error(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
