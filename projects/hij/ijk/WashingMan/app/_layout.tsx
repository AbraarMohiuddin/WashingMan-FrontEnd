import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Keep the tabs inside a stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Explicitly ensure "details/[id]" is a stack screen */}
      <Stack.Screen
        name="details/[id]"
        options={{ title: "Machine Details", headerShown: true }}
      />
    </Stack>
  );
}
