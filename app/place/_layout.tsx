import { Stack } from "expo-router";

export default function PlaceLayout() {
    return(
        <Stack>
        <Stack.Screen
          name="placeFirst"
          options={{ title: "placeFirst", presentation: "modal", headerShown:false }}
        />
         <Stack.Screen
          name="placeLoading"
          options={{ title: "placeLoading", presentation: "modal", headerShown:false }}
        />
        <Stack.Screen
          name="placeCompleted"
          options={{ title: "placeCompleted", presentation: "modal", headerShown:false }}
        />
         <Stack.Screen
          name="placeFinish"
          options={{ title: "placeFinish", presentation: "modal", headerShown:false }}
        />
        </Stack>
    )
}