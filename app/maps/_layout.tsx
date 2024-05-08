import { Stack } from "expo-router";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Touchable,
  TouchableOpacity,Text
} from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";

export const unstable_settings = {
  initialRouteName: "fullMarkerMap",
};


export default function MapsLayout() {
  return(<Stack screenOptions={{ headerShown: true}}>
       <Stack.Screen
          name="fullMarkerMap"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapScreen"
          options={{ title: "MappScreen", headerShown: false }}
        />
         <Stack.Screen
          name="library"
          options={{ title: "Library", headerShown: false }}
        />
         <Stack.Screen
          name="museum"
          options={{ title: "Museum", headerShown: false }}
        />
         <Stack.Screen
          name="park"
          options={{ title: "Park", headerShown: false }}
        />
        
  </Stack>);
}