import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Touchable,
  TouchableOpacity,Text, View 

} from "react-native";
import { router } from "expo-router";

// import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import BasicButton from "@/components/BasicButton";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("@/assets/images/company/LemonMul.png")}
        ></Image>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("@/assets/images/company/FREEPATH.png")}
        ></Image>
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          text="로그인"
          onPress={() => router.push("/users/login")}
        />
        <BasicButton
          text="회원가입"
          onPress={() => router.push("/users/register")}
        />
      </View>

      <Text>copyright © LemonMul</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "40%",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  image: { width: 80, height: 80, marginHorizontal: 10 },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonTxt: {
    color: Colors.white,
    fontWeight: "normal",
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
