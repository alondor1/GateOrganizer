import axios from "axios";

//const localhost = "http://localhost:3004";
const render = "https://gateorganizer-backend.onrender.com";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: render, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
