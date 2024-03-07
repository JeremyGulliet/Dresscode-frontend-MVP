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

import DropDownPicker from "react-native-dropdown-picker";

import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ValidateCameraScreen({ navigation, route }) {
  const { url } = route.params;
  const user = useSelector((state) => state.user.value);

  const [category, setCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryItems, setCategoryItems] = useState([
    { label: "Haut", value: "Haut" },
    { label: "Bas", value: "Bas" },
    { label: "Accessoire", value: "Accessoire" },
  ]);
  const [type, setType] = useState("");
  const [colors, setColors] = useState("");
  const [size, setSize] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [event, setEvent] = useState("");
  const [brand, setBrand] = useState("");

  const handleInputChange = (fieldName, text, selectedValue) => {
    switch (fieldName) {
      case "category":
        setCategory(selectedValue);
        break;
      case "type":
        setType(text);
        break;
      case "colors":
        setColors(text);
        break;
      case "size":
        setSize(text);
        break;
      case "weatherType":
        setWeatherType(text);
        break;
      case "tempMin":
        setTempMin(text);
        break;
      case "tempMax":
        setTempMax(text);
        break;
      case "event":
        setEvent(text);
        break;
      case "brand":
        setBrand(text);
        break;

      default:
        break;
    }
  };
  const handleOpenPicker = () => {
    setOpenCategory(true);
    console.log("Picker opened");
  };

  const handleClosePicker = () => {
    setOpenCategory(false);
    console.log("Picker closed");
  };

  const handleSubmit = () => {
    console.log(
      category,
      type,
      colors,
      size,
      weatherType,
      tempMin,
      tempMax,
      event,
      brand
    );
    fetch("http://192.168.1.138:3000/weathers", {
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
        fetch("http://192.168.1.138:3000/descriptions", {
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
            fetch("http://192.168.1.138:3000/brands", {
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
                fetch("http://192.168.1.138:3000/articles", {
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

              <DropDownPicker
                open={openCategory}
                value={category}
                items={categoryItems}
                setOpen={setOpenCategory}
                setValue={(selectedValue) =>
                  handleInputChange("category", null, selectedValue)
                }
                setItems={setCategoryItems}
                placeholder="Sélectionnez une catégorie..."
                containerStyle={{ height: 40, width: "75%" }}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
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
  dropdownContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "green",
  },

  selectedValue: {
    fontSize: 18,
    marginLeft: 10,
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
