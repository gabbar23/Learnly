import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials:true,
});

export default apiClient;