
import { Stack } from "expo-router";

export default function MapsLayout() {
  return(<Stack>
        <Stack.Screen
          name="weathers/weatherFirst"
          options={{ title: "Weather", presentation: "modal", headerShown:false }}
        />
  </Stack>);
}