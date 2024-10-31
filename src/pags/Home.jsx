import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const data = require("../data/posts.json");
    setPosts(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Home");
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.content}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Image
                  source={{ uri: item.imgUrl }}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 100,
                  }}
                />
                <Text
                  style={{
                    color: "#B8001F",
                    fontWeight: "800",
                    fontSize: 15,
                    marginLeft: 10,
                    marginTop: 8,
                  }}
                >
                  {item.username}
                </Text>
              </View>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.content}</Text>
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
