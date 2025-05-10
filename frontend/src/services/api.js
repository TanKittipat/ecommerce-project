import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach the token to every request if it exists
instance.interceptors.request.use(
  (config) => {
    console.log(config);

    const token = cookies.get("user");

    if (token) {
      config.headers["x-access-token"] = token.userInfo.token;
    }
    console.log("Request Headers:", config.headers);
    return config;
  },
  (err) => {
    console.error("Interceptor error:", err);
    return Promise.reject(err);
  }
);

export default instance;
