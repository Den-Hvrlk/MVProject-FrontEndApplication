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
