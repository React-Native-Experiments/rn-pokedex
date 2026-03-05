import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[pokemon_id]"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
