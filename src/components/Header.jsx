import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { IconButton } from "react-native-paper";

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.text}>Feed</Text>
        </View>
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity style={styles.btn}>
          <IconButton
            icon="plus"
            size={25}
            onPress={() => console.log("plus")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Search")}
        >
          <IconButton icon="magnify" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 105,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  header: {
    height: 50,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  container_btn: {
    height: 50,
    width: 80,
    flexDirection: "row",
    marginRight: 7,
    justifyContent: "space-between",
  },
  btn: {
    height: 35,
    width: 35,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#B30D2D",
    alignItems: "center",
    justifyContent: "center",
  },
});
