import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const moveToPlace = () => {
  router.replace("weathers/moreRecommendation");
}

const moveToFinish = () => {
  router.replace("weathers/weatherFinish");
}

const weatherCompleted = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/weather/SeoulLib.png")}
          style={styles.libraryImage}
        />
      </View>
      <Text style={styles.title}>서울 도서관</Text>
      <Text style={styles.subtitle}>오늘은 햇빛이 좋네요!</Text>
      <Text style={styles.subtitle}>이곳은 어떨까요?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={moveToFinish}>
          <Text style={styles.buttonText}>좋아요!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={moveToPlace}>
          <Text style={styles.buttonText}>별로에요!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  libraryImage: {
    width: 300,
    height: 180,
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.black,
    textAlign: "center",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  likeButton: {
    backgroundColor: Colors.blue,
  },
  dislikeButton: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
  },
});

export default weatherCompleted;
