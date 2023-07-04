import axios from "axios";

const api = axios.create({
  baseURL: "https://dealer-t14-g10.onrender.com",
  timeout: 5000,
});

export { api };
