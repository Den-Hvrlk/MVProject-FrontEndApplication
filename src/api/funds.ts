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

export const createRequest = async (
  token: string,
  registerForm: RegisterFundProps
) => {
  const response = await axiosPrivate.post(
    "/funds/create-request",
    JSON.stringify(registerForm),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getRegistrationFundRequests = async (token: string) => {
  const response = await axiosPrivate.get(`/funds/get-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    },
  });

  return response.data;
};

export const resolveRequest = async (token: string, id: string) => {
  const response = await axiosPrivate.post(
    `/funds/resolve-register/${id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const rejectRequest = async (token: string, id: string) => {
  const response = await axiosPrivate.put(
    `/funds/reject-register/${id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
