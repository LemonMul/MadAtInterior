import { Stack } from "expo-router";

export default function SeoulLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="seoulFirst" />
    </Stack>
  );
}
