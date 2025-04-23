import { AxiosInstance } from "axios";
import { RegisterFundProps } from "../components/main/RegisterFund/RegisterFund";

export const registerFund = async (
  axiosInstance: AxiosInstance,
  registerForm: RegisterFundProps
) => {
  const response = await axiosInstance.post("/funds/register", registerForm);

  return response.data;
};

export const createRequest = async (
  axiosInstance: AxiosInstance,
  registerForm: RegisterFundProps
) => {
  const response = await axiosInstance.post(
    "/funds/create-request",
    registerForm
  );
  return response.data;
};

export const getRegistrationFundRequests = async (
  axiosInstance: AxiosInstance
) => {
  const response = await axiosInstance.get("/funds/get-requests");
  return response.data;
};

export const resolveRequest = async (
  axiosInstance: AxiosInstance,
  id: string
) => {
  const response = await axiosInstance.post(`/funds/resolve-register/${id}`);
  return response.data;
};

export const rejectRequest = async (
  axiosInstance: AxiosInstance,
  id: string
) => {
  const response = await axiosInstance.put(`/funds/reject-register/${id}`);
  return response.data;
};
