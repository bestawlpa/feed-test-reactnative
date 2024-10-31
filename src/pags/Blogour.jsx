import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Blogour({ navigation }) {
  const [activeTab, setActiveTab] = useState("Blogour");
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Blogour");
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

  useEffect(() => {
    const fetchPosts = async () => {
      const data = require("../data/posts.json");
      if (userData) {
        const filteredPosts = data.filter(
          (post) => post.userId === userData.id
        );
        setUserPosts(filteredPosts);
      }
    };

    fetchPosts();
  }, [userData]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <FlatList
          data={userPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Detail", { postId: item.postId })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  height: 50,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.imgUrl }}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 100,
                    marginRight: 10,
                    borderWidth: 3,
                    borderColor: "#E2D784",
                  }}
                />
                <Text
                  style={{
                    color: "#C21010",
                    fontWeight: "900",
                    fontSize: 15,
                  }}
                >
                  {item.username}
                </Text>
              </View>
              <Text style={{ fontWeight: "900", marginBottom: 2 }}>
                {item.title}
              </Text>
              <Text>Content: {item.content}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.postId}
        />
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
  },
  card: {
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
});
