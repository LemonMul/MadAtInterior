import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text, View
} from "react-native";
// import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import BasicButton from "@/components/BasicButton";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    router.replace("/(tabs)");
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/FigureTop.png")}
        />
      </View>
      <View>
        <Text style={styles.mainTxt}>로그인</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          name={"user-o"}
          size={25}
          color={Colors.gray}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Fontisto
          name={"locked"}
          size={25}
          color={Colors.gray}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton text="로그인" onPress={handleLogin} />
      </View>
      {/* <View style={styles.fixedImageBackground}>
        <ImageBackground
          source={require("@/assets/images/FigureBottom.png")}
          resizeMode="contain"
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: { height: "20%" },
  image: { width: "100%", height: 130 },
  mainTxt: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.black,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    marginVertical: 20,
    elevation: 10,
    alignItems: "center",
    height: 50,
  },
  textInput: { flex: 1 },
  inputIcon: { marginHorizontal: 15 },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  fixedImageBackground: {},
});
