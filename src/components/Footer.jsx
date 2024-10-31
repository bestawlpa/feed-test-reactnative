import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function Footer({ navigation, activeTab, setActiveTab }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.button, activeTab === "Home" && styles.activeButton]}
        onPress={() => {
          setActiveTab("Home");
          navigation.navigate("Home");
        }}
      >
        <IconButton icon="home" size={25} style={styles.buttonText} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeTab === "Blogour" && styles.activeButton]}
        onPress={() => {
          setActiveTab("Blogour");
          navigation.navigate("Blogour");
        }}
      >
        <IconButton icon="clipboard" size={25} style={styles.buttonText} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeTab === "Profile" && styles.activeButton]}
        onPress={() => {
          setActiveTab("Profile");
          navigation.navigate("Profile");
        }}
      >
        <IconButton icon="account" size={25} style={styles.buttonText} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FCF8F3",
  },
  button: {
    paddingHorizontal: 18,
    height: 60,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#333",
  },
  activeButton: {
    borderTopWidth: 2,
    borderTopColor: "#007bff",
  },
});
