import axios from "axios";

 const BASE_URL = "https://dummyjson.com";

export const headers = new Headers({
  Accept: "application/json;charset=UTF-8",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Cache-Control": "max-age=20, min-fresh=15",
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: headers,
  mode: "cors",
});

export default axiosInstance;
