import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { logoutUser } from "../api/users";

const useLogout = () => {
  const { setAuth, setPersist } = useAuth();
  const { showToast } = useToast();
  const logout = async () => {
    setAuth({
      id: 0,
      email: "",
      roles: [],
      accessToken: "",
      userName: "",

      userFunds: [],
      userGroups: [],
    });
    try {
      const response = await logoutUser();

      localStorage.removeItem("persist");
      setPersist(false);

      showToast(response.message, "success");
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
