import axios from "axios";

const password = import.meta.env.VITE_BACKEND_SECRET;
const user = "admin";
const basicAuth = btoa(`${user}:${password}`);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${basicAuth}`,
  },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error) // devolvé el error tal cual
);

export default apiClient;
