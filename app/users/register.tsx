import { Button, StyleSheet, TextInput, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import BasicButton from "@/components/BasicButton";
import Colors from "@/constants/Colors";
import { FontAwesome, Fontisto } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = () => {
    router.replace("/(tabs)");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
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
      <BasicButton text= "회원가입" onPress={handleRegister} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },imageContainer: { height: "20%" },
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
