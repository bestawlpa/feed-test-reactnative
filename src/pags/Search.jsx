import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Search({ navigation }) {
  const [activeTab, setActiveTab] = useState("Search");
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text>Search</Text>
      </View>
      <Footer
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
