import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SvgUri from "react-native-svg-uri";
import DefaultUserPic from "../assets/defaultUserPic.svg";
import { useSelector } from "react-redux";

function UserCompo({ navigation }) {
  const user = useSelector((state) => state.user.value);
  return (
    <View style={styles.userPicContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}><SvgUri
        style={styles.defaultUserPic}
        source={DefaultUserPic}
        width={35}
        height={35}
      /></TouchableOpacity>
      <Text style={styles.userNameText}>{user.username}</Text>
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
    marginRight: 10,
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
