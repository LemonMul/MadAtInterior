import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import BackButton from "@/components/BackButton";


const moveToCompleted = () => {
    router.replace("weathers/weatherCompleted")
}

const WeatherLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        </View>
      <Image
        source={require("@/assets/images/weather/Sun.png")}
        style={styles.sunImage}
      />
      <Text style={styles.loadingTitle}>
        현재 날씨에 맞는 장소를 분석하고 있어요
      </Text>
      <Text style={styles.loadingSubtitle}>
        실시간 날씨를 반영하여
      </Text>
      <Text style={styles.loadingSubtitle}>
        고정밀 위치 매핑중이에요!
      </Text>

      <TouchableOpacity style={styles.loadingIndicatorContainer} onPress={moveToCompleted}>
      {/* <View style={styles.loadingIndicator} />   */}
      <Text style={{fontWeight: 'bold', color: Colors.white}}> . . .</Text>
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
  header : {
    position: 'absolute',
    top : 20,
    left: 10,
    width: '100%',
  },
  sunImage: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  loadingTitle: {
    margin: 9,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginBottom: 15,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: Colors.white,
    textAlign: "center",
    marginBottom: 5,
  },
  loadingIndicatorContainer: {
    marginTop: 40,
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4fa7ec",
    justifyContent: "center",
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 40,
    height: 10,
    backgroundColor: "#98d1ff",
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default WeatherLoading;
