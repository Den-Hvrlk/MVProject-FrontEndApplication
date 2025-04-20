import { RegisterFundProps } from "../components/main/RegisterFund/RegisterFund";
import { axiosPrivate } from "./axios";

export const registerFund = async (registerForm: RegisterFundProps) => {
  const response = await axiosPrivate.post(
    "/funds/register",
    JSON.stringify(registerForm),
    {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    }
  );

  return response.data;
};
