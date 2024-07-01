import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Change to your backend's address
  withCredentials: true, // Important to include credentials (cookies)
});

export default axiosInstance;
