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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
// DropDownPicker.setListMode("SCROLLVIEW");

import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ValidateCameraScreen({ navigation, route }) {
  const { url } = route.params;
  const user = useSelector((state) => state.user.value);
  /* --- États dropdown "category" --- */
  const [category, setCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryItems, setCategoryItems] = useState([
    { label: "Haut", value: "Haut" },
    { label: "Bas", value: "Bas" },
    { label: "Accessoire", value: "Accessoire" },
  ]);
  const [isFocusCategory, setIsFocusCategory] = useState(false);
  const [isSelectedCategory, setIsSelectedCategory] = useState(false);

  /* --- États dropdown "type" --- */

  const [type, setType] = useState(null);
  //   const [openType, setOpenType] = useState(false);
  const typeItems = [
    { label: "Blouse", value: "Blouse" },
    { label: "Chemise", value: "Chemise" },
    { label: "Jean", value: "Jean" },
    { label: "Jupe", value: "Jupe" },
    { label: "Manteau", value: "Manteau" },
    { label: "Pantalon", value: "Pantalon" },
    { label: "Pull", value: "Pull" },
    { label: "Robe", value: "Robe" },
    { label: "Short", value: "Short" },
    { label: "Sweatshirt", value: "Sweatshirt" },
    { label: "T-shirt", value: "T-shirt" },
    { label: "Veste", value: "Veste" },
  ];

  const [isFocusType, setIsFocusType] = useState(false);
  const [isSelectedType, setIsSelectedType] = useState(false);

  /* --- États dropdown "colors" --- */
  const [colors, setColors] = useState(null);
  const [openColors, setOpenColors] = useState(false);
  const [colorsItems, setColorsItems] = useState([
    { label: "Abricot", value: "Abricot" },
    { label: "Argenté", value: "Argenté" },
    { label: "Beige", value: "Beige" },
    { label: "Blanc", value: "Blanc" },
    { label: "Bleu", value: "Bleu" },
    { label: "Bleu clair", value: "Bleu clair" },
    { label: "Bleu marine", value: "Bleu marine" },
    { label: "Bordeaux", value: "Bordeaux" },
    { label: "Corail", value: "Corail" },
    { label: "Crème", value: "Crème" },
    { label: "Doré", value: "Doré" },
    { label: "Gris", value: "Gris" },
    { label: "Jaune", value: "Jaune" },
    { label: "Jaune moutarde", value: "Jaune moutarde" },
    { label: "Kaki", value: "Kaki" },
    { label: "Lila", value: "Lila" },
    { label: "Marron", value: "Marron" },
    { label: "Multicolore", value: "Multicolore" },
    { label: "Noir", value: "Noir" },
    { label: "Orange", value: "Orange" },
    { label: "Rose", value: "Rose" },
    { label: "Rouge", value: "Rouge" },
    { label: "Turquoise", value: "Turquoise" },
    { label: "Vert", value: "Vert" },
    { label: "Vert foncé", value: "Vert foncé" },
    { label: "Vert menthe", value: "Vert menthe" },
    { label: "Violet", value: "Violet" },
  ]);
  const [isFocusColors, setIsFocusColors] = useState(false);
  const [isSelectedColors, setIsSelectedColors] = useState(false);

  /* --- États dropdown "size" --- */
  const [size, setSize] = useState("");

  /* --- États dropdown "weatherType" --- */
  const [weatherType, setWeatherType] = useState("");
  const [openWeatherType, setOpenWeatherType] = useState(false);
  const [weatherTypeItems, setWeatherTypeItems] = useState([
    { label: "Neige", value: "Neige" },
    { label: "Nuages", value: "Nuages" },
    { label: "Pluie", value: "Pluie" },
    { label: "Soleil", value: "Soleil" },
  ]);
  const [isFocusWeatherType, setIsFocusWeatherType] = useState(false);
  const [isSelectedWeatherType, setIsSelectedWeatherType] = useState(false);

  /* --- États dropdown "tempMin" & "tempMax" --- */
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  /* --- États dropdown "event" --- */

  const [event, setEvent] = useState("");
  const [openEvent, setOpenEvent] = useState(false);
  const [eventItems, setEventItems] = useState([
    { label: "Cérémonie", value: "Cérémonie" },
    { label: "Détente", value: "Détente" },
    { label: "Fête", value: "Fête" },
    { label: "Mariage", value: "Mariage" },
    { label: "Soirée", value: "Soirée" },
    { label: "Sport", value: "Sport" },
    { label: "Travail", value: "Travail" },
    { label: "Voyage", value: "Voyage" },
  ]);
  const [isFocusEvent, setIsFocusEvent] = useState(false);
  const [isSelectedEvent, setIsSelectedEvent] = useState(false);

  /* --- États dropdown "brand" --- */

  const [brand, setBrand] = useState("");
  const [openBrand, setOpenBrand] = useState(false);
  const [brandItems, setBrandItems] = useState([
    { label: "Adidas", value: "Adidas" },
    { label: "Balenciaga", value: "Balenciaga" },
    { label: "Calvin Klein", value: "Calvin Klein" },
    { label: "Chanel", value: "Chanel" },
    { label: "Christian Dior", value: "Christian Dior" },
    { label: "Célio", value: "Célio" },
    { label: "Converse", value: "Converse" },
    { label: "Dolce & Gabbana", value: "Dolce & Gabbana" },
    { label: "Fendi", value: "Fendi" },
    { label: "Gucci", value: "Gucci" },
    { label: "H&M", value: "H&M" },
    { label: "Hermès", value: "Hermès" },
    { label: "Hugo Boss", value: "Hugo Boss" },
    { label: "Kenzo", value: "Kenzo" },
    { label: "Lacoste", value: "Lacoste" },
    { label: "Levi's", value: "Levi's" },
    { label: "Louis Vuitton", value: "Louis Vuitton" },
    { label: "Mango", value: "Mango" },
    { label: "Michael Kors", value: "Michael Kors" },
    { label: "New Balance", value: "New Balance" },
    { label: "Nike", value: "Nike" },
    { label: "Puma", value: "Puma" },
    { label: "Ralph Lauren", value: "Ralph Lauren" },
    { label: "Reebok", value: "Reebok" },
    { label: "Saint Laurent", value: "Saint Laurent" },
    { label: "Salomon", value: "Salomon" },
    { label: "Supreme", value: "Supreme" },
    { label: "The North Face", value: "The North Face" },
    { label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
    { label: "UGG", value: "UGG" },
    { label: "Uniqlo", value: "Uniqlo" },
    { label: "Valentino", value: "Valentino" },
    { label: "Vans", value: "Vans" },
    { label: "Versace", value: "Versace" },
    { label: "Victoria's Secret", value: "Victoria's Secret" },
    { label: "Zara", value: "Zara" },
  ]);
  const [isFocusBrand, setIsFocusBrand] = useState(false);
  const [isSelectedBrand, setIsSelectedBrand] = useState(false);

  const handleInputChange = (fieldName, text, value) => {
    switch (fieldName) {
      case "category":
        setCategory(value);
        break;
      case "type":
        setType(value);
        break;
      case "colors":
        setColors(value);
        break;
      case "size":
        setSize(text);
        break;
      case "weatherType":
        setWeatherType(value);
        break;
      case "tempMin":
        setTempMin(text);
        break;
      case "tempMax":
        setTempMax(text);
        break;
      case "event":
        setEvent(value);
        break;
      case "brand":
        setBrand(value);
        break;

      default:
        break;
    }
  };

  const renderLabel = (fieldName) => {
    const isSelectedState =
      fieldName === "category"
        ? isSelectedCategory
        : fieldName === "type"
        ? isSelectedType
        : fieldName === "colors"
        ? isSelectedColors
        : fieldName === "weatherType"
        ? isSelectedWeatherType
        : fieldName === "event"
        ? isSelectedEvent
        : fieldName === "brand"
        ? isSelectedBrand
        : false;

    const isFocusState =
      fieldName === "category"
        ? isFocusCategory
        : fieldName === "type"
        ? isFocusType
        : fieldName === "colors"
        ? isFocusColors
        : fieldName === "weatherType"
        ? isFocusWeatherType
        : fieldName === "event"
        ? isFocusEvent
        : fieldName === "brand"
        ? isFocusBrand
        : false;

    const label = getFieldLabel(fieldName);

    // // On applique un style différent pour le label "Marque"
    // const labelBrand = fieldName === "brand" ? styles.labelBrand : styles.label;

    if ((fieldName && isSelectedState) || isFocusState) {
      console.log("RENDERLABEL : ", fieldName, "isFocus : ", isFocusState);
      return (
        <Text
          style={[
            styles.label,
            isSelectedState && !isFocusState && { color: "#FF4B8C" },
          ]}
        >
          {label}
        </Text>
      );
    }

    return null;
  };

  const getFieldLabel = (fieldName) => {
    switch (fieldName) {
      case "category":
        return "Catégorie";
      case "type":
        return "Type";
      case "colors":
        return "Couleurs";
      case "weatherType":
        return "Météo";
      case "event":
        return "Évènement";
      case "brand":
        return "Marque";
      default:
        return "";
    }
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
                    favorite: true,
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
        <HeaderCompo navigation={navigation} />
      </View>

      <View style={styles.contentContainer}>
        {/* ----------------------------------------------------------------------------- IMAGE -------- */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: url }} style={styles.image} />
        </View>
        <View style={styles.separation}></View>

        {/* ----------------------------------------------------------------------DROPDOWNS & INPUTS -------- */}
        <View style={styles.descriptionContainer}>
          <View style={styles.inputsContainer}>
            {/* §§§§§§§§§§§§§§§§§§§ BLOC CATEGORY + TYPE + FAVORITE §§§§§§§§§§§§§§§§§§§ */}
            <View style={styles.blocCategoryTypeFavorite}>
              {/* §§§§§§§§§§§§§§§§§§§ BLOC CATEGORY & TYPE §§§§§§§§§§§§§§§§§§§ */}
              <View style={styles.blocCategoryType}>
                {/* ------------------- @DROPDOWN - CATEGORY  ------------------- */}
                <View style={styles.inputContainer}>
                  {/* <Text style={styles.label}>Catégorie : </Text> */}
                  {renderLabel("category")}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      //   isFocus && { borderColor: "#FF4B8C" },
                      isSelectedCategory && { borderColor: "#FF4B8C" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={categoryItems}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusCategory ? "Catégorie ..." : "..."}
                    value={category}
                    onFocus={() => setIsFocusCategory(true)}
                    onBlur={() => setIsFocusCategory(false)}
                    onChange={(selectedValue) => {
                      //   setValue(selectedValue);
                      console.log(selectedValue.value);
                      handleInputChange("category", null, selectedValue.value);
                      setIsFocusCategory(false);
                      setIsSelectedCategory(true);
                    }}
                    // renderLeftIcon={() => (
                    //   <Text
                    //     style={[
                    //       styles.labelNEW,
                    //       isFocus && styles.focusedLabel,
                    //     ]}
                    //   >
                    //     {value ? value.label : "Dropdown label"}
                    //   </Text>
                    // )}
                    // renderLeftIcon={() => (
                    //   <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? "blue" : "black"}
                    //     name="Safety"
                    //     size={20}
                    //   />
                    // )}
                  />
                </View>
                {/* ------------------- @DROPDOWN - TYPE  ------------------- */}
                <View style={styles.inputContainer}>
                  {/* <Text style={styles.label}>Type : </Text> */}
                  {renderLabel("type")}
                  <Dropdown
                    style={[
                      styles.dropdown,
                      //   isFocus && { borderColor: "#FF4B8C" },
                      isSelectedType && { borderColor: "#FF4B8C" },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={typeItems}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusType ? "Type ..." : "..."}
                    searchPlaceholder="Recherche..."
                    value={type}
                    onFocus={() => setIsFocusType(true)}
                    onBlur={() => setIsFocusType(false)}
                    onChange={(selectedValue) => {
                      //   setValue(selectedValue);
                      console.log(selectedValue.value);
                      handleInputChange("type", null, selectedValue.value);
                      setIsFocusType(false);
                      setIsSelectedType(true);
                    }}
                    // renderLeftIcon={() => (
                    //   <Text
                    //     style={[
                    //       styles.labelNEW,
                    //       isFocus && styles.focusedLabel,
                    //     ]}
                    //   >
                    //     {value ? value.label : "Dropdown label"}
                    //   </Text>
                    // )}
                    // renderLeftIcon={() => (
                    //   <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? "blue" : "black"}
                    //     name="Safety"
                    //     size={20}
                    //   />
                    // )}
                  />
                </View>
              </View>
              <View style={styles.faHeart}>
                <Text>
                  <FontAwesomeIcon icon={faHeart} size={30} color="red" />
                </Text>
              </View>
            </View>
            {/* §§§§§§§§§§§§§§§§§§§ BLOC COLORS & SIZE §§§§§§§§§§§§§§§§§§§ */}
            <View style={styles.blocColorsSize}>
              {/* ------------------- @DROPDOWN - COLORS  ------------------- */}
              <View style={styles.inputContainerColors}>
                {/* <Text style={styles.label}>Couleurs</Text> */}
                {renderLabel("colors")}
                <Dropdown
                  style={[
                    styles.dropdown,
                    //   isFocus && { borderColor: "#FF4B8C" },
                    isSelectedColors && { borderColor: "#FF4B8C" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={colorsItems}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusColors ? "Couleurs ..." : "..."}
                  searchPlaceholder="Recherche..."
                  value={colors}
                  onFocus={() => setIsFocusColors(true)}
                  onBlur={() => setIsFocusColors(false)}
                  onChange={(selectedValue) => {
                    //   setValue(selectedValue);
                    console.log(selectedValue.value);
                    handleInputChange("colors", null, selectedValue.value);
                    setIsFocusColors(false);
                    setIsSelectedColors(true);
                  }}
                />
              </View>
              {/* ------------------- @INPUT - SIZE  ------------------- */}
              <View style={styles.inputContainerSize}>
                <Text style={styles.sizeText}>Taille</Text>
                <TextInput
                  style={[styles.input, styles.size]}
                  placeholder="M, 42, ..."
                  onChangeText={(text) => handleInputChange("size", text)}
                  value={size}
                />
              </View>
            </View>
            {/* §§§§§§§§§§§§§§§§§§§ BLOC WEATHER + TEMPMIN + TEMPMAX §§§§§§§§§§§§§§§§§§§ */}
            <View style={styles.blocWeatherTemperature}>
              {/* ------------------- @DROPDOWN - WEATHER  ------------------- */}
              <View style={styles.inputContainerWeather}>
                {/* <Text style={styles.label}>Météo</Text> */}
                {renderLabel("weatherType")}
                <Dropdown
                  style={[
                    styles.dropdown,
                    //   isFocus && { borderColor: "#FF4B8C" },
                    isSelectedWeatherType && { borderColor: "#FF4B8C" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  //   inputSearchStyle={styles.inputSearchStyle}
                  data={weatherTypeItems}
                  //   search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusWeatherType ? "Météo ..." : "..."}
                  //   searchPlaceholder="Recherche..."
                  value={weatherType}
                  onFocus={() => setIsFocusWeatherType(true)}
                  onBlur={() => setIsFocusWeatherType(false)}
                  onChange={(selectedValue) => {
                    //   setValue(selectedValue);
                    console.log(selectedValue.value);
                    handleInputChange("weatherType", null, selectedValue.value);
                    setIsFocusWeatherType(false);
                    setIsSelectedWeatherType(true);
                  }}
                />
              </View>
              <View style={styles.inputContainerTemperatures}>
                {/* ------------------- @INPUT - TEMPMIN  ------------------- */}
                <View style={styles.tempMinContainer}>
                  <Text style={styles.tempText}>TempMin</Text>
                  <TextInput
                    style={[styles.input, styles.tempMin]}
                    keyboardType="numeric"
                    placeholder="5, 12, ..."
                    onChangeText={(text) => {
                      handleInputChange("tempMin", text, null);
                      console.log(text);
                    }}
                    value={tempMin}
                  />
                </View>
                {/* ------------------- @INPUT - TEMPMAX  ------------------- */}
                <View style={styles.tempMaxContainer}>
                  <Text style={styles.tempText}>TempMax</Text>
                  <TextInput
                    style={[styles.input, styles.tempMax]}
                    keyboardType="numeric"
                    placeholder="20, 35, ..."
                    onChangeText={(text) =>
                      handleInputChange("tempMax", text, null)
                    }
                    value={tempMax}
                  />
                </View>
              </View>
            </View>
            {/* §§§§§§§§§§§§§§§§§§§ BLOC EVENT & BRAND §§§§§§§§§§§§§§§§§§§ */}
            <View style={styles.blocEventBrand}>
              {/* ------------------- @DROPDOWN - EVENT  ------------------- */}
              {/* <View style={styles.inputContainer}> */}
              {/* <Text style={styles.label}>Évènement : </Text> */}
              <View style={styles.handleLabels}>
                {renderLabel("event")}
                <Dropdown
                  style={[
                    styles.dropdownsEventBrand,
                    //   isFocus && { borderColor: "#FF4B8C" },
                    isSelectedEvent && { borderColor: "#FF4B8C" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  //   inputSearchStyle={styles.inputSearchStyle}
                  data={eventItems}
                  //   search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusEvent ? "Évènement ..." : "..."}
                  //   searchPlaceholder="Recherche..."
                  value={event}
                  onFocus={() => setIsFocusEvent(true)}
                  onBlur={() => setIsFocusEvent(false)}
                  onChange={(selectedValue) => {
                    //   setValue(selectedValue);
                    console.log(selectedValue.value);
                    handleInputChange("event", null, selectedValue.value);
                    setIsFocusEvent(false);
                    setIsSelectedEvent(true);
                  }}
                />
              </View>
              {/* </View> */}
              {/* ------------------- @DROPDOWN - BRAND  ------------------- */}
              {/* <View style={styles.inputContainer}> */}
              {/* <Text style={styles.label}>Marque : </Text> */}
              <View style={styles.handleLabels}>
                {renderLabel("brand")}
                <Dropdown
                  style={[
                    styles.dropdownsEventBrand,
                    //   isFocus && { borderColor: "#FF4B8C" },
                    isSelectedBrand && { borderColor: "#FF4B8C" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={brandItems}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocusBrand ? "Marque ..." : "..."}
                  searchPlaceholder="Recherche..."
                  value={brand}
                  onFocus={() => setIsFocusBrand(true)}
                  onBlur={() => setIsFocusBrand(false)}
                  onChange={(selectedValue) => {
                    //   setValue(selectedValue);
                    console.log(selectedValue.value);
                    handleInputChange("brand", null, selectedValue.value);
                    setIsFocusBrand(false);
                    setIsSelectedBrand(true);
                  }}
                />
              </View>
              {/* </View> */}
            </View>
          </View>
        </View>

        {/* -------- @BUTTONS -------- */}
        <View style={styles.buttons}>
          <Button
            style={styles.btnToCamera}
            title="Go To Camera"
            onPress={() => navigation.navigate("CameraScreen")}
          />

          <Button
            style={styles.btnToDressing}
            title="Go To Dressing"
            onPress={() => handleSubmit()}
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
    justifyContent: "center",
    marginTop: 10,
    // borderWidth: 2,
    // borderColor: "yellow",
  },
  inputsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "90%",
    // marginLeft: 40,
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
    // borderColor: "blue",
  },

  blocCategoryTypeFavorite: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blocCategoryType: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 100,
    // borderWidth: 2,
    // borderColor: "green",
  },

  blocColorsSize: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blocWeatherTemperature: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    // borderColor: "black",
    // borderWidth: 2,
  },
  inputContainerColors: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    // marginLeft: 40,
    height: "auto",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  inputContainerSize: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    height: 50,
    // borderWidth: 2,
    // borderColor: "blue",
  },
  sizeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainerWeather: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "left",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  inputContainerTemperatures: {
    flex: 0.8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    marginLeft: 5,
    // borderWidth: 2,
    // borderColor: "blue",
  },
  tempMinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "red",
  },
  tempMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "red",
  },
  tempText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  blocEventBrand: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "green",
  },
  handleLabels: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "black",
  },
  inputContainerColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 40,
    // width: "100%",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  faHeart: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 0,
    width: "50%",
    fontSize: 18,
    zIndex: 1,
  },
  dropdownContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    // borderWidth: 2,
    // borderColor: "green",
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
  // ---------------------------------------TEST NOUVEAU DROPDOWN
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 35,
    width: 200,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownsEventBrand: {
    height: 35,
    width: "95%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "whitesmoke",
    left: 5,
    top: -12,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: "right",
    marginRight: 25,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  focusedLabel: {
    color: "#0E0E66", // Change la couleur du label en bleu lorsqu'il est en focus
  },
});
