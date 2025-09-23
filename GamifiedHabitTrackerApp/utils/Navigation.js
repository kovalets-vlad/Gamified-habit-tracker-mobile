import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import { AuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { token } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {token ? (
                    <Stack.Screen name="Main" component={MainScreen} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
