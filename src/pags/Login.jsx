import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";
import usersData from "../data/users.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("something@example.com");
  const [password, setPassword] = useState("password789");
  const [openInputEmail, setOpenInputEmail] = useState(false);
  const [openInputPassword, setOpenInputPassword] = useState(false);

  const handleOpenInputEmail = () => {
    setOpenInputEmail(!openInputEmail);
  };

  const handleOpenInputPassword = () => {
    setOpenInputPassword(!openInputPassword);
  };

  const handleClearEmail = () => {
    setEmail("");
  };

  const handleClearPassword = () => {
    setPassword("");
  };

  const handleLogin = async () => {
    const user = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      try {
        await AsyncStorage.setItem("userToken", "someRandomTokenValue");
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
        console.log("Login successful!");
        navigation.navigate("Home");
      } catch (error) {
        console.log("Error saving data", error);
      }
    } else {
      Alert.alert("Login Failed", "Email or password is incorrect.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image style={styles.logo} source={require("../assets/loga.png")} />
        </TouchableOpacity>
        <View>
          <View style={styles.containerInput}>
            <TouchableOpacity
              onPress={handleOpenInputEmail}
              style={styles.boxInput}
            >
              <View style={styles.contentInput}>
                {!openInputEmail ? (
                  <View>
                    <Text>email</Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Text>email</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                      />
                    </View>

                    <View>
                      <TouchableOpacity onPress={handleClearEmail}>
                        <IconButton icon="backspace" size={15} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleOpenInputPassword}
              style={styles.boxInput}
            >
              <View style={styles.contentInput}>
                {!openInputPassword ? (
                  <View>
                    <Text>password</Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Text>password</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="visible-password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                      />
                    </View>
                    <View>
                      <TouchableOpacity onPress={handleClearPassword}>
                        <IconButton icon="backspace" size={15} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} style={styles.logIn}>
              <Text style={{ color: "white" }}>LogIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBDCEB",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  content: {
    height: 300,
    width: 340,
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxInput: {
    height: 50,
    width: 330,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 2,
  },
  contentInput: {
    height: 45,
    width: 180,
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  input: {
    height: 25,
    width: 285,
    backgroundColor: "white",
    justifyContent: "center",
  },
  containerInput: {
    height: 160,
    width: 200,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logIn: {
    height: 40,
    width: 330,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B30D2D",
    borderRadius: 10,
  },
});
