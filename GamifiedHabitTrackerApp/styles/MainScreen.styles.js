import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 18,
        color: "#555",
    },
    errorText: {
        fontSize: 16,
        color: "red",
    },
    habitCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    habitTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    habitDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    habitFrequency: {
        fontSize: 14,
        color: "#333",
    },
    habitStatus: {
        fontSize: 14,
        marginTop: 5,
        fontStyle: "italic",
        color: "#333",
    },
});
