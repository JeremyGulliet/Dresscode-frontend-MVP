import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function FooterCompo({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-circle-left" size={40} color="#ffffff" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
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

  // backContainer: {
  //   marginLeft: 40,
  // },
});

export default FooterCompo;
