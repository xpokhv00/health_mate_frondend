import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  // baseURL: process.env.BABEL_BACKEND_URL,
  baseURL: "http://127.0.0.1:8000/",
});

api.interceptors.request.use(
  async (config: any) => {
    const accessToken = await AsyncStorage.getItem("tokens");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken).access}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;
