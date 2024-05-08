
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
         <Stack.Screen
          name="weatherLoading"
          options={{ title: "weatherLoading", presentation: "modal", headerShown:false }}
        />
         <Stack.Screen
          name="weatherCompleted"
          options={{ title: "weatherCompleted", presentation: "modal", headerShown:false }}
        />
  </Stack>);
}