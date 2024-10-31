import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { IconButton } from "react-native-paper";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Detail({ route, navigation }) {
  const { postId } = route.params;
  const [activeTab, setActiveTab] = useState("Detail");
  const [post, setPost] = useState([]);
  console.log("post", post);

  useEffect(() => {
    const data = require("../data/posts.json");
    const dataId = data.find((e) => e.postId == postId);
    setPost(dataId);
  }, [postId]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <View
          style={{
            width: "100%",
            height: 60,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <IconButton icon="arrow-left" size={25} iconColor="#2B3467" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardPost}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              height: 50,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: post.imgUrl }}
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

            <Text style={{ color: "#C21010", fontWeight: "900", fontSize: 15 }}>
              {post.username}
            </Text>
          </View>
          <Text style={{ fontWeight: "900" }}>{post.title}</Text>
          <Text>{post.content}</Text>
        </View>
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
    marginTop: 10,
  },
  cardPost: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
  },
});
