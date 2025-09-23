import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../api/api";

export default function MainScreen() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await api.get("/habits/user/");
                setHabits(res.data);
            } catch (e) {
                setError("Помилка завантаження звичок");
            } finally {
                setLoading(false);
            }
        };
        fetchHabits();
    }, []);
    if (loading) {
        return (
            <View>
                <Text>Завантаження...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View>
                <Text>{error}</Text>
            </View>
        );
    }
    return (
        <View>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.title}</Text>}
            />
        </View>
    );
}
