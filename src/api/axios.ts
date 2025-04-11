import axios from "axios";

export const api = axios.create({
  baseURL: "https://mvproject-backendwebapplication.onrender.com/api",
});

export default api;
