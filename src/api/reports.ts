import axios from "./axios";

export const getReports = async () => {
  const response = await axios.get("/reports");

  return response.data;
};

export const getReport = async (id: string) => {
  const response = await axios.get(`/reports/${id}`);

  return response.data;
};
