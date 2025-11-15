import axios from "axios";
import { baseURL } from "../constants";
import { auth } from "../../firebase.config.js";

export const axiosSecure = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor to set the latest ID token
axiosSecure.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
