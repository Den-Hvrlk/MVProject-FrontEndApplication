import axios from "./axios";

export const createUser = async (
  email: string,
  username: string,
  password: string
) => {
  const response = await axios.post(
    "/users/Register",
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
    "/users/Login",
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
