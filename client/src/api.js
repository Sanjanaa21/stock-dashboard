import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://stock-dashboard-backend.onrender.com",
});

export default API;
