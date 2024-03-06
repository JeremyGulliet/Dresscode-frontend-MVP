import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import RNPickerSelect from "react-native-picker-select";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "50%",
  },
  inputAndroid: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: "50%",
  },
});
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ValidateCameraScreen({ navigation, route }) {
  const { url } = route.params;
  const user = useSelector((state) => state.user.value);

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [colors, setColors] = useState("");
  const [size, setSize] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [event, setEvent] = useState("");
  const [brand, setBrand] = useState("");
  const [favorite, setFavorite] = useState(false);

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

  const handleSubmit = () => {
    fetch("http://192.168.1.41:3000/weathers", {
      // requête POST pour créer une entrée dans la collection "weathers"
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: weatherType,
        temp_min: tempMin,
        temp_max: tempMax,
      }),
    })
      .then((response) => response.json())
      .then((weatherData) => {
        //console.log("Mon ID:", weatherData.newWeather._id)
        //requête POST pour créer une entrée dans la collection "descriptions"
        fetch("http://192.168.1.41:3000/descriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: type,
            category: category,
            size: size,
            color: colors,
            event: event,
          }),
        })
          .then((response) => response.json())
          .then((descriptionData) => {
            //console.log(descriptionData)
            //requête POST pour créer une entrée dans la collection "brands"
            fetch("http://192.168.1.41:3000/brands", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: brand,
              }),
            })
              .then((response) => response.json())
              .then((brandData) => {
                //console.log(brandData)
                //requêtePOST pour créer le nouvel article dans la collection "articles"
                fetch("http://192.168.1.41:3000/articles", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    weather: weatherData.newWeather._id,
                    useDate: new Date(),
                    favorite: favorite,
                    url_image: url,
                    description: descriptionData.newDescription._id,
                    brand: brandData.newBrand._id,
                  }),
                })
                  .then((data) => {
                    //console.log(data);
                    navigation.navigate("DressingScreen");
                  })
                  .catch((error) => {
                    // Gérer les erreurs de requête
                    console.error(
                      "Erreur lors de l'envoi de l'article:",
                      error
                    );
                  });
              })
              .catch((error) => {
                // Gérer les erreurs de requête pour la création de la marque
                console.error(
                  "Erreur lors de la création de la marque:",
                  error
                );
              });
          })
          .catch((error) => {
            // Gérer les erreurs de requête pour la création de la description
            console.error(
              "Erreur lors de la création de la description:",
              error
            );
          });
      })
      .catch((error) => {
        // Gérer les erreurs de requête pour la création de la météo
        console.error("Erreur lors de la création de la météo:", error);
      });
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
        <View style={styles.descriptionContainer}>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Catégorie : </Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(value) => handleInputChange("category", value)}
                items={[
                  { label: "Haut", value: "Haut" },
                  { label: "Bas", value: "Bas" },
                  { label: "Accessoire", value: "Accessoire" },
                ]}
                placeholder={{
                  label: "Sélectionnez une catégorie...",
                  value: null,
                }}
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

        {/* -------- BUTTONS -------- */}
        <View style={styles.buttons}>
          <Button
            title="Go To Camera"
            onPress={() => navigation.navigate("CameraScreen")}
          />

          <Button title="Go To Dressing" onPress={() => handleSubmit()} />
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
    // borderWidth: 2,
    // borderColor: "red",
  },

  imageContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    // borderWidth: 2,
    // borderColor: "green",
  },
  separation: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
  },
  descriptionContainer: {
    width: "100%",
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    // borderWidth: 2,
    // borderColor: "yellow",
  },
  inputsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "80%",
    marginLeft: 40,
    // borderWidth: 2,
    // borderColor: "red",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 40,
    width: "100%",
    height: 40,
    // borderWidth: 2,
    // borderColor: "green",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 0,
    width: "50%",
    fontSize: 18,
  },

  buttons: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  footer: {
    flex: 1,
  },
});
