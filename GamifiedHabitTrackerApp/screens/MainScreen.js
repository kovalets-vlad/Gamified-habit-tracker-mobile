import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../api/api";
import styles from "../styles/MainScreen.styles";

export default function MainScreen() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await api.get("/habits/");
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
            <View style={styles.center}>
                <Text style={styles.loadingText}>Завантаження...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const renderHabit = ({ item }) => (
        <View style={styles.habitCard}>
            <Text style={styles.habitTitle}>{item.title}</Text>
            {item.description ? <Text style={styles.habitDescription}>{item.description}</Text> : null}
            <Text style={styles.habitFrequency}>Щодня: {item.frequency} раз(и)</Text>
            <Text style={styles.habitStatus}>Статус: {item.is_active ? "Активна ✅" : "Неактивна ❌"}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderHabit}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}
