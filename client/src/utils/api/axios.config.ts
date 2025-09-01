import axios from "axios";

export const formDataHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
