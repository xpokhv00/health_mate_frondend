import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  // baseURL: process.env.BABEL_BACKEND_URL,
  baseURL: "https://healthmate-95f95e8e168c.herokuapp.com/",
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
