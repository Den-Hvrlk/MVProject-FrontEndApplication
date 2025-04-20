import { UserProfileProps } from "../components/main/UserProfile/UserProfile";
import axios, { axiosPrivate } from "./axios";

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

export const getUserProfile = async (token: string) => {
  const response = await axiosPrivate.get(`/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const updateUserProfile = async (
  token: string,
  newProfile: UserProfileProps
) => {
  const response = await axiosPrivate.put(
    `/users/updateuserprofile`,
    newProfile,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
