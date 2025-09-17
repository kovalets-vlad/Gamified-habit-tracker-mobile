import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import api from "../api/api";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            const response = await api.post("/login", { username, password });
            console.log(response.data);
        } catch (e) {
            setError("Невірний логін або пароль");
        }
    };

    return (
        <View>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={login} />
            {error ? <Text>{error}</Text> : null}
        </View>
    );
}
