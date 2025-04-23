import { AxiosInstance } from "axios";
import { UserProfileProps } from "../components/main/UserProfile/UserProfile";
import axios from "./axios";

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  const response = await axios.post(
    "/users/register",
    JSON.stringify({ email, username, password }),
    {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    }
  );

  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    "/users/login",
    { email, password },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post("/auth/logout", null, {
    withCredentials: true,
  });

  return response.data;
};

export const getUserProfile = async (axiosInstance: AxiosInstance) => {
  const response = await axiosInstance.get(`/users/profile`);
  return response.data;
};

export const updateUserProfile = async (
  axiosInstance: AxiosInstance,
  data: UserProfileProps
) => {
  const response = await axiosInstance.put(`/users/updateuserprofile`, data);
  return response.data;
};
