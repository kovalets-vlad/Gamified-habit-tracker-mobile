import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      {token ? (
        <Text style={styles.loggedInText}>Ви вже увійшли! Токен: {token}</Text>
      ) : (
        <>
          <Text style={styles.title}>Вхід у застосунок</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.button}>
            <Button title="Login" onPress={handleLogin} color="#4CAF50" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  loggedInText: {
    fontSize: 18,
    textAlign: "center",
    color: "#4CAF50",
  },
});
