import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const savedToken = await AsyncStorage.getItem("token");
                if (savedToken) setToken(savedToken);
            } catch (e) {
                console.error("Помилка завантаження токена:", e);
            } finally {
                setLoading(false);
            }
        };
        loadToken();
    }, []);

    const login = async (newToken) => {
        setToken(newToken);
        await AsyncStorage.setItem("token", newToken);
    };

    const logout = async () => {
        setToken(null);
        await AsyncStorage.removeItem("token");
    };

    return <AuthContext.Provider value={{ token, login, logout, loading }}>{children}</AuthContext.Provider>;
};
