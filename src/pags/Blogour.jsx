import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
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
    // โหลดข้อมูลโพสต์จากไฟล์ JSON
    const fetchPosts = async () => {
      const data = require("../data/posts.json");
      if (userData) {
        // กรองโพสต์ให้ตรงกับผู้ใช้ที่ล็อกอินอยู่
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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>Post: {item.postId}</Text>
              <Image
                source={{ uri: item.imgUrl }}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 100,
                }}
              />
              <Text>userId: {item.userId}</Text>
              <Text>Title: {item.title}</Text>
              <Text>Content: {item.content}</Text>
            </View>
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
    width: "full",
    borderRadius: 10,
    padding: 10,
  },
});
