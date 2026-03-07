import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        title: "Pokedex",
        tabBarActiveTintColor: "#644AC9",
        headerShown: false, // web
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Pokedex",
          tabBarIcon: ({ color, size }) => <Ionicons name="apps-sharp" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
