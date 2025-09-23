import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/api";

export default function LoginScreen() {
    const { login, token } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await api.post("/login", { username, password });
            login(response.data.access_token);
        } catch (e) {
            console.error("Помилка входу", e);
        }
    };

    return (
        <View>
            {token ? (
                <Text>Ви вже увійшли! Токен: {token}</Text>
            ) : (
                <>
                    <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
                    <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
                    <Button title="Login" onPress={handleLogin} />
                </>
            )}
        </View>
    );
}
