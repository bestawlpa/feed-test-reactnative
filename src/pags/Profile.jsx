import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton } from "react-native-paper";

export default function Profile({ navigation }) {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  console.log(userData, "useData");

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Profile");
    }, [])
  );

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.navigate("Login");
      } else {
        setIsLoggedIn(true);
        const user = await AsyncStorage.getItem("loggedInUser");
        if (user) {
          setUserData(JSON.parse(user));
        }
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigation.navigate("Login");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        {userData && (
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              height: "80%",
            }}
          >
            <View>
              <View
                style={{
                  width: 205,
                  height: 205,
                  backgroundColor: "#B8001F",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: userData.imgUrl }}
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text style={styles.name}>{userData.username}</Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "full",
                backgroundColor: "red",
                paddingHorizontal: 40,
                borderRadius: 10,
                color: "white",
              }}
            >
              <TouchableOpacity
                onPress={handleLogout}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <IconButton icon="logout" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Footer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBDCEB",
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  name: {
    fontSize: 40,
    marginTop: 20,
    color: "#F19ED2",
    fontWeight: "900",
    textShadowColor: "#FCF596",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
});
