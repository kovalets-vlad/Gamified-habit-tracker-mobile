import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.31.133:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    console.log("Sending token:", token);
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    console.log("Request headers:", config.headers);
    return config;
});


export default api;
