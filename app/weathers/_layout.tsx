
import { Stack } from "expo-router";

export default function MapsLayout() {
  return(<Stack>
        <Stack.Screen
          name="weatherFirst"
          options={{ title: "Weather", presentation: "modal", headerShown:false }}
        />
        <Stack.Screen
          name="weatherSearch"
          options={{ title: "WeatherSearch", presentation: "modal", headerShown:false }}
        />
  </Stack>);
}