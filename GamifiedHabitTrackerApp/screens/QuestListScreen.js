import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import api from "../api/api";

export default function QuestListScreen() {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            const res = await api.get("/habits/user/");
            setHabits(res.data);
        };
        fetchHabits();
    }, []);

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
