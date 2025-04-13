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
        WithCredentials: true,
      },
    }
  );

  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    "/users/Login",
    JSON.stringify({ email, password }),
    {
      headers: {
        "Content-Type": "application/json",
        WithCredentials: "true",
      },
    }
  );

  return response.data;
};
