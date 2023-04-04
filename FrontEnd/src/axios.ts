import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://csci5308vm5.research.cs.dal.ca:8080", // Replace with your API base URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials:true,
});

export default apiClient;
