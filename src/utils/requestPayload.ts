import axios, { AxiosRequestConfig } from "axios";
import { config } from "./constants";
import { getItem } from "./storage";

interface Payload {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  [key: string]: any; // Allow additional properties
}

export const requestPayload = (
  payload: Payload,
  url: string,
  headers: Record<string, string> = { "Content-Type": "application/json" }
) => {
  const axiosInstance = axios.create({
    baseURL: config.baseURL,
    responseType: "json",
    headers: headers,
  });

  const options: AxiosRequestConfig = {
    method: payload?.method || "POST",
    data: payload,
    baseURL: config.baseURL,
  };

  const token = getItem("user")?.token;
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => Promise.reject(err)
  );

  return axiosInstance(url, options);
};
