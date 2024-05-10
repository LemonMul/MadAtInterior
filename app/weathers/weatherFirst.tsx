import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { useRouter, router } from "expo-router";
import BackButton from "@/components/BackButton";

const handleStart = () => {
  router.replace("/weathers/weatherSearch");
};

const WeatherFirst = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton router={router} />
      </View>
      <Image
        source={require("@/assets/images/weather/Cloud.png")}
        style={styles.weatherIconMoon}
      />
      <Image
        source={require("@/assets/images/weather/LittleRain.png")}
        style={styles.weatherIconLittleRain}
      />
      <Image
        source={require("@/assets/images/weather/Rain.png")}
        style={styles.weatherIconSunRain}
      />
      <Image
        source={require("@/assets/images/weather/Sun.png")}
        style={styles.weatherIconSun}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>날씨 맞춤 장소 추천 서비스</Text>
        <Text style={styles.subtitle}>장소 추천 서비스를</Text>
        <Text style={styles.subtitle}>이용해보세요!</Text>
        <Text style={styles.subtitle}>날씨에 맞춰 주변을 탐색해요!</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Image
          source={require("@/assets/images/buttonBackgroundBlue.png")}
          style={styles.buttonBackground}
        />
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#69b3f9",
  },
  header:{
    width: '100%',
    position: 'absolute',
    top: 20,
    left: 10,
  },
  weatherIconMoon: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 60,
    left: 30,
  },
  weatherIconLittleRain: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 250,
    left: 50,
  },
  weatherIconSunRain: {
    width: 150,
    height: 150,
    position: "absolute",
    top: 180,
    right: 40,
  },
  weatherIconSun: {
    width: 130,
    height: 130,
    position: "absolute",
    top: 20,
    right: 30,
  },
  textContainer: {
    alignItems: "flex-start",
    position: "absolute",
    bottom: 150,
    left: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "left",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.white,
    textAlign: "left",
    marginBottom: 3,
  },
  startButton: {
    marginTop: 30,
    position: 'absolute',
    bottom: 30,
    left: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonBackground: {
    width: 250,
    height: 60,
    resizeMode: "contain",
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    position: 'absolute',
  },
});

export default WeatherFirst;
