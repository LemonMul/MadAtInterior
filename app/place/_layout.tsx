import { Stack } from "expo-router";

export default function PlaceLayout() {
    return(
        <Stack>
            <Stack.Screen name="placeFirst" options={{headerShown: false}}/>
        </Stack>
    )
}