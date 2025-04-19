import axios from "axios";

const BASE_URL = "https://mvproject-backendwebapplication.onrender.com/api";
const LOCAL_URL = "https://localhost:7285/api";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosLocalPrivate = axios.create({
  baseURL: LOCAL_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
