import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.31.133:8000";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${API_URL}/refresh`, { refresh_token: refreshToken });
        return response.data.access_token;
    } catch (e) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refreshToken");
        throw e;
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            const newToken = await refreshAccessToken(refreshToken);
            await AsyncStorage.setItem("token", newToken);
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axios(error.config);
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
