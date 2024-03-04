import React from "react";
import { View, Text, StyleSheet } from "react-native";

function AppTitleCompo() {
  return (
    <View style={styles.appTitleContainer}>
      <Text style={styles.appTitle}>DressCode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appTitleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    marginLeft: 10,
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "yellow",
  },
  appTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default AppTitleCompo;
