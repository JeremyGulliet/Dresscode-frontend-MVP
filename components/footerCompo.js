import React from "react";
import { View, StyleSheet } from "react-native";

function footerCompo() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#0E0E66",
  },
});

export default footerCompo;
