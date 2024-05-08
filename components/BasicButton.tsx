import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import Colors from "@/constants/Colors";

interface BasicButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function BasicButton({
  text,
  onPress,
  style,
  textStyle,
}: BasicButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={require("@/assets/images/buttonBackground.png")}
        style={[styles.button, style]}
        resizeMode="contain"
      >
        <Text style={[styles.buttonTxt, textStyle]}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonTxt: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
