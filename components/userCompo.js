import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import DefaultUserPic from "../assets/defaultUserPic.svg";

function UserCompo() {
  return (
    <View style={styles.userPicContainer}>
      <SvgUri
        style={styles.defaultUserPic}
        source={DefaultUserPic}
        width={35}
        height={35}
      />
      <Text style={styles.userNameText}>Username</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userPicContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    resizeMode: "cover",
    // borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "red",
  },
  defaultUserPic: {
    marginTop: 5,
    padding: 5,
    borderRadius: 40,
    backgroundColor: "#8D878761",
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
});

export default UserCompo;
