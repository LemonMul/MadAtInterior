import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Touchable,
  TouchableOpacity,Text
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { useColorScheme } from "@/components/useColorScheme";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "welcome",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    <ThemeProvider value={DefaultTheme}>
      <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
          name="users/login"
          options={{ title: "LOGIN" }}
        />
         <Stack.Screen
          name="users/register"
          options={{ title: "REGISTER", presentation: "modal" }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ title: "TABS", headerShown: false }}
        />
        <Stack.Screen name="weathers" options={{ title: "WEATHERS", headerShown: false }}/>
        <Stack.Screen name="seoul" options={{ title: "SEOUL", headerShown: false }}/>
      </Stack>
      
    </ThemeProvider>
  );
}
