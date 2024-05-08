import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const moveToWeatherPage = () => {
  router.replace("weathers/weatherFirst");
};

export default function NewPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ImageBackground
          source={require("@/assets/images/Weather-home.png")}
          style={styles.weatherImage}
        >
          <TouchableOpacity style={styles.buttonPosition} onPress={moveToWeatherPage}>
            <ImageBackground
              source={require("@/assets/images/buttonBackgroundBlue.png")}
              style={styles.buttonBackground}
              imageStyle={{ borderRadius: 20 }}
            >
              <Text style={styles.buttonText}>시작하기</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherImage: {
    width: "100%",
    height: "100%",
  },
  buttonPosition: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  buttonBackground: {
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
