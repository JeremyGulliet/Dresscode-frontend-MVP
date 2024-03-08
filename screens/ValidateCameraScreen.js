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

  /* --- États dropdown "type" --- */
  const [type, setType] = useState(null);
  const [openType, setOpenType] = useState(false);
  const [typeItems, setTypeItems] = useState([
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
  ]);

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

  const [size, setSize] = useState("");

  /* --- États dropdown "colors" --- */
  const [weatherType, setWeatherType] = useState("");
  const [openWeatherType, setOpenWeatherType] = useState(false);
  const [weatherTypeItems, setWeatherTypeItems] = useState([
    { label: "Neige", value: "Neige" },
    { label: "Nuages", value: "Nuages" },
    { label: "Pluie", value: "Pluie" },
    { label: "Soleil", value: "Soleil" },
  ]);

  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

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

  const handleInputChange = (fieldName, text, selectedValue) => {
    switch (fieldName) {
      case "category":
        setCategory(selectedValue);
        break;
      case "type":
        setType(selectedValue);
        break;
      case "colors":
        setColors(selectedValue);
        break;
      case "size":
        setSize(text);
        break;
      case "weatherType":
        setWeatherType(selectedValue);
        break;
      case "tempMin":
        setTempMin(text);
        break;
      case "tempMax":
        setTempMax(text);
        break;
      case "event":
        setEvent(selectedValue);
        break;
      case "brand":
        setBrand(selectedValue);
        break;

      default:
        break;
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
                    placeholder="Votre choix..."
                    maxHeight={200}
                    containerStyle={{
                      height: 34,
                      width: "60%",
                      //   borderColor: "red",
                      //   borderWidth: 2,
                      zIndex: 10,
                    }}
                    style={{
                      backgroundColor: "#fafafa",
                      borderWidth: 1,
                      borderColor: "#d5d5d9",
                      backgroundColor: "#eee",
                      borderRadius: 40,
                      minHeight: 30,
                      zIndex: 10,
                    }}
                    itemStyle={{
                      justifyContent: "flex-start",
                    }}
                    dropDownStyle={{ backgroundColor: "#fafafa" }}
                  />
                </View>
                {/* ------------------- @DROPDOWN - TYPE  ------------------- */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Type : </Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    // scrollViewProps={{
                    //   nestedScrollEnabled: true,
                    // }}
                    open={openType}
                    value={type}
                    items={typeItems}
                    setOpen={setOpenType}
                    setValue={(selectedValue) =>
                      handleInputChange("type", null, selectedValue)
                    }
                    setItems={setTypeItems}
                    placeholder="Votre choix..."
                    searchable={true} // Permet la recherche
                    searchablePlaceholder="Rechercher un type"
                    searchableError={() => <Text fontSize={16}>Not found</Text>}
                    maxHeight={230}
                    containerStyle={{
                      height: 34,
                      width: "60%",
                      //   borderColor: "red",
                      //   borderWidth: 2,
                      zIndex: 9,
                    }}
                    style={{
                      backgroundColor: "#fafafa",
                      borderWidth: 1,
                      borderColor: "#d5d5d9",
                      backgroundColor: "#eee",
                      borderRadius: 40,
                      minHeight: 30,
                    }}
                    dropDownContainerStyle={{
                      position: "relative",
                      top: 0,
                      height: 200,
                    }}
                    itemStyle={{
                      justifyContent: "flex-start",
                    }}
                    dropDownStyle={{ backgroundColor: "#fafafa" }}
                  // scrollViewProps={{
                  //   style: { maxHeight: 200 },
                  // }}
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
                <Text style={styles.label}>Couleurs</Text>
                <DropDownPicker
                  // multiple={true}
                  // min={0}
                  // max={3}
                  open={openColors}
                  value={colors}
                  items={colorsItems}
                  setOpen={setOpenColors}
                  setValue={(selectedValue) =>
                    handleInputChange("colors", null, selectedValue)
                  }
                  setItems={setColorsItems}
                  placeholder="Votre choix..."
                  searchable={true} // Permet la recherche
                  searchablePlaceholder="Rechercher dans les couleurs"
                  searchableError={() => <Text fontSize={16}>Not found</Text>}
                  maxHeight={200}
                  containerStyle={{
                    height: 34,
                    width: "100%",
                    //   borderColor: "red",
                    //   borderWidth: 2,
                    zIndex: 8,
                  }}
                  style={{
                    backgroundColor: "#fafafa",
                    borderWidth: 1,
                    borderColor: "#d5d5d9",
                    backgroundColor: "#eee",
                    borderRadius: 40,
                    minHeight: 30,
                    //   zIndex: 10,
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                />
              </View>
              {/* ------------------- @INPUT - SIZE  ------------------- */}
              <View style={styles.inputContainerSize}>
                <Text style={styles.label}>Taille</Text>
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
                <Text style={styles.label}>Météo</Text>
                <DropDownPicker
                  open={openWeatherType}
                  value={weatherType}
                  items={weatherTypeItems}
                  setOpen={setOpenWeatherType}
                  setValue={(selectedValue) =>
                    handleInputChange("weatherType", null, selectedValue)
                  }
                  setItems={setWeatherTypeItems}
                  placeholder="Votre choix..."
                  maxHeight={200}
                  containerStyle={{
                    height: 34,
                    width: "100%",
                    //   borderColor: "red",
                    //   borderWidth: 2,
                    zIndex: 7,
                  }}
                  style={{
                    backgroundColor: "#fafafa",
                    borderWidth: 1,
                    borderColor: "#d5d5d9",
                    backgroundColor: "#eee",
                    borderRadius: 40,
                    minHeight: 30,
                    //   zIndex: 6,
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                />
              </View>
              {/* ------------------- @INPUT - TEMPMIN  ------------------- */}
              <View style={styles.inputContainerTemperatures}>
                <Text style={styles.label}>TempMin</Text>
                <TextInput
                  style={[styles.input, styles.tempMin]}
                  keyboardType="numeric"
                  placeholder="5, 12, ..."
                  onChangeText={(text) => handleInputChange("tempMin", text)}
                  value={tempMin}
                />
              </View>
              {/* ------------------- @INPUT - TEMPMAX  ------------------- */}
              <View style={styles.inputContainerColumn}>
                <Text style={styles.label}>TempMax</Text>
                <TextInput
                  style={[styles.input, styles.tempMax]}
                  keyboardType="numeric"
                  placeholder="20, 35, ..."
                  onChangeText={(text) => handleInputChange("tempMax", text)}
                  value={tempMax}
                />
              </View>
            </View>
            {/* ------------------- @DROPDOWN - EVENT  ------------------- */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Évènement : </Text>
              <DropDownPicker
                open={openEvent}
                value={event}
                items={eventItems}
                setOpen={setOpenEvent}
                setValue={(selectedValue) =>
                  handleInputChange("event", null, selectedValue)
                }
                setItems={setEventItems}
                placeholder="Votre choix..."
                maxHeight={200}
                containerStyle={{
                  height: 34,
                  width: "65%",
                  //   borderColor: "red",
                  //   borderWidth: 2,
                  zIndex: 6,
                }}
                style={{
                  backgroundColor: "#fafafa",
                  borderWidth: 1,
                  borderColor: "#d5d5d9",
                  backgroundColor: "#eee",
                  borderRadius: 40,
                  minHeight: 30,
                  //   zIndex: 10,
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
              />
            </View>
            {/* ------------------- @DROPDOWN - BRAND  ------------------- */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Marque : </Text>
              <DropDownPicker
                listMode="SCROLLVIEW"
                // scrollViewProps={{
                //   nestedScrollEnabled: true,
                // }}
                open={openBrand}
                value={brand}
                items={brandItems}
                setOpen={setOpenBrand}
                setValue={(selectedValue) =>
                  handleInputChange("brand", null, selectedValue)
                }
                setItems={setBrandItems}
                placeholder="Votre choix..."
                searchable={true} // Permet la recherche
                searchablePlaceholder="Rechercher une marque"
                searchableError={() => <Text fontSize={16}>Not found</Text>}
                maxHeight={230}
                containerStyle={{
                  height: 34,
                  width: "65%",
                  //   borderColor: "red",
                  //   borderWidth: 2,
                  zIndex: 5,
                }}
                style={{
                  backgroundColor: "#fafafa",
                  borderWidth: 1,
                  borderColor: "#d5d5d9",
                  backgroundColor: "#eee",
                  borderRadius: 40,
                  minHeight: 30,
                }}
                dropDownContainerStyle={{
                  position: "relative",
                  top: 0,
                  height: 200,
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
              // scrollViewProps={{
              //   style: { maxHeight: 200 },
              // }}
              />
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
    justifyContent: "center",
    alignItems: "flex-start",
    width: 250,
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
    // borderColor: "black",
    // borderWidth: 2,
  },
  inputContainerColors: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 40,
    width: "40%",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  inputContainerSize: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 40,
    width: "50%",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  inputContainerWeather: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 40,
    width: "40%",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  inputContainerTemperatures: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 40,
    width: "30%",
    height: "auto",
    // borderWidth: 2,
    // borderColor: "blue",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    // borderColor: "green",
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
});
