import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Detail({ route, navigation }) {
  const { postId } = route.params;
  const [activeTab, setActiveTab] = useState("Detail");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const data = require("../data/posts.json");
    const dataId = data.find((e) => e.postId == postId);
    setPost(dataId);
  }, [postId]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <IconButton icon="chevron-left" size={25} />
        </TouchableOpacity>
        <Text>Detail:{postId}</Text>
        <Text>{post.title}</Text>
        <Text>{post.content}</Text>
        <Text>{post.username}</Text>
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
