import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000",
  // baseURL: "https://stock-dashboard-2-aofp.onrender.com",
  baseURL: "https://stock-dashboard-4.onrender.com",
});

export default API;
