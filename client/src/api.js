import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://stock-dashboard-2-aofp.onrender.com",
});

export default API;
