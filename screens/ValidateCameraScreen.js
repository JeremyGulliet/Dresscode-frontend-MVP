import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

export default function ValidateCameraScreen({ navigation, route }) {
  const { url } = route.params;

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [colors, setColors] = useState("");
  const [size, setSize] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [event, setEvent] = useState("");
  const [brand, setBrand] = useState("");

  const handleInputChange = (fieldName, text) => {
    if (fieldName === "category") {
      setCategory(text);
    } else if (fieldName === "type") {
      setType(text);
    } else if (fieldName === "colors") {
      setColors(text);
    } else if (fieldName === "size") {
      setSize(text);
    } else if (fieldName === "weatherType") {
      setWeatherType(text);
    } else if (fieldName === "tempMin") {
      setTempMin(text);
    } else if (fieldName === "tempMax") {
      setTempMax(text);
    } else if (fieldName === "event") {
      setEvent(text);
    } else if (fieldName === "brand") {
      setBrand(text);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.headerContainer}>
        <HeaderCompo />
      </View>

      <View style={styles.contentContainer}>
        {/* -------- IMAGE -------- */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: url }} style={styles.image} />
        </View>
        <View style={styles.separation}></View>

        {/* -------- INPUTS -------- */}
        <View style={styles.handleInputs}>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Catégorie : </Text>
              <TextInput
                style={[styles.input, styles.category]}
                placeholder="Haut, bas, ..."
                onChangeText={(text) => handleInputChange("category", text)}
                value={category}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Type : </Text>
              <TextInput
                style={[styles.input, styles.type]}
                placeholder="T-shirt, jean, ..."
                onChangeText={(text) => handleInputChange("type", text)}
                value={type}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Colors : </Text>
              <TextInput
                style={[styles.input, styles.colors]}
                placeholder="black, red, ..."
                onChangeText={(text) => handleInputChange("colors", text)}
                value={colors}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Size : </Text>
              <TextInput
                style={[styles.input, styles.size]}
                placeholder="M, 42, ..."
                onChangeText={(text) => handleInputChange("size", text)}
                value={size}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Weather type : </Text>
              <TextInput
                style={[styles.input, styles.weatherType]}
                placeholder="Soleil, Pluie, ..."
                onChangeText={(text) => handleInputChange("weatherType", text)}
                value={weatherType}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>TempMin : </Text>
              <TextInput
                style={[styles.input, styles.tempMin]}
                placeholder="5, 12, ..."
                onChangeText={(text) => handleInputChange("tempMin", text)}
                value={tempMin}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>TempMax : </Text>
              <TextInput
                style={[styles.input, styles.tempMax]}
                placeholder="20, 35, ..."
                onChangeText={(text) => handleInputChange("tempMax", text)}
                value={tempMax}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Event : </Text>
              <TextInput
                style={[styles.input, styles.event]}
                placeholder="Travail, Soirée, ..."
                onChangeText={(text) => handleInputChange("event", text)}
                value={event}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Brand : </Text>
              <TextInput
                style={[styles.input, styles.brand]}
                placeholder="Adidas, Devred, ..."
                onChangeText={(text) => handleInputChange("brand", text)}
                value={brand}
              />
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          {/* -------- BUTTONS -------- */}
          <Button
            title="Go To Camera"
            onPress={() => navigation.navigate("CameraScreen")}
          />

          <Button
            title="Go To Dressing"
            onPress={() => navigation.navigate("DressingScreen")}
          />
        </View>
      </View>

      <FooterCompo style={styles.footer} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#0E0E66",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainer: {
    flex: 1,
    marginTop: 40,
  },

  contentContainer: {
    flex: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
  },

  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
  },
  separation: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
  },
  handleInputs: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: "yellow",
  },
  inputsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "80%",
    marginLeft: 40,
    borderWidth: 2,
    borderColor: "red",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 40,
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "green",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 0,
    width: "50%",
  },

  descriptionContainer: {
    flex: 4,
    borderTopWidth: 2,
    width: "100%",
  },

  image: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
  },
  footer: {
    flex: 1,
  },
});
