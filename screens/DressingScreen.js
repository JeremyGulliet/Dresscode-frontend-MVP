import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";

import { FontAwesome6 } from "@expo/vector-icons";
import HeaderCompo from "../components/headerCompo";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useIsFocused } from "@react-navigation/native";

import { faStepBackward } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

export default function DressingScreen({ navigation }) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const focus = useIsFocused();
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);

  const user = useSelector((state) => state.user.value);

  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);

  const [placeholderText, setPlaceholderText] = useState(
    "Filtrer par couleur..."
  );

  // On initialise la sélection par couleur
  const [selectedColor, setSelectedColor] = useState("all");
  const [isFocusColors, setIsFocusColors] = useState(false); // Pour gérer le placeholder

  // On crée le filtre par catégorie et par couleur
  const filterArticlesByCategoryAndColor = (articles, category, color) => {
    return articles
      .filter(
        (item) => item.description && item.description.category === category
      )
      .filter(
        (item) =>
          color === "all" ||
          (item.description && item.description.color === color) ||
          color === "Filtrer par couleur..."
      )
      .sort((a, b) => new Date(b.useDate) - new Date(a.useDate));
  };

  /* --- initialisation des couleurs pour le dropdown --- */
  const colorsItems = [
    { label: "Réinitialiser", value: "Filtrer par couleur..." },
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
  ];

  useEffect(() => {
    fetchArticles();
  }, [focus, selectedColor]);

  const fetchArticles = () => {
    fetch(`${API_URL}/articles/dressing/${user.token}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const filteredTops = filterArticlesByCategoryAndColor(
          data,
          "Haut",
          selectedColor
        );
        setTops(filteredTops);

        const filteredBottoms = filterArticlesByCategoryAndColor(
          data,
          "Bas",
          selectedColor
        );
        setBottoms(filteredBottoms);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  };

  const handleTopPress = (top) => {
    // console.log("handleTopPress");
    setSelectedTop(top);
  };

  const handleBottomPress = (bottom) => {
    // console.log("handleBottomPress");
    setSelectedBottom(bottom);
  };

  const handleResetTop = () => {
    setSelectedTop(null);
  };

  const handleResetBottom = () => {
    setSelectedBottom(null);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <View style={styles.headerContainer}>
          <HeaderCompo navigation={navigation} />
        </View>
        {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
        <View style={styles.container}>
          {/* en tete */}

          {/* filter */}
          <View style={styles.filterContainer}>
            <Dropdown
              style={[
                styles.dropdown,
                //   isFocus && { borderColor: "#FF4B8C" },
                // isSelectedColors && { borderColor: "#FF4B8C" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={colorsItems}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                !isFocusColors && selectedColor === "all"
                  ? "Filtrer par couleur..."
                  : placeholderText
              }
              searchPlaceholder="Recherche..."
              value={selectedColor}
              onFocus={() => {
                setIsFocusColors(true);
                setPlaceholderText("...");
              }}
              onBlur={() => {
                setIsFocusColors(false);
                setPlaceholderText(
                  selectedColor === "all" ? "Filtrer par couleur..." : "..."
                );
              }}
              onChange={(selectedValue) => {
                //   setValue(selectedValue);
                // console.log("SelectedValue.label --->", selectedValue.label);
                // console.log("SelectedValue.value --->", selectedValue.value);
                if (selectedValue.label === "Réinitialiser") {
                  setSelectedColor("all");
                  setPlaceholderText("Filtrer par couleur...");
                } else {
                  setSelectedColor(selectedValue.value);
                  // setPlaceholderText("...");
                }
                setIsFocusColors(false);
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <FontAwesome6 name="magnifying-glass" size={30} color="#0E0E66" />
            </TouchableOpacity>
          </View>
          <View style={styles.articlesContainer}>
            {/* vetement haut */}
            <View style={styles.topContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {tops.map((top, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleTopPress(top)}
                    onLongPress={() =>
                      navigation.navigate("ArticleScreen", {
                        item: top,
                      })
                    }
                  >
                    <Image
                      source={{ uri: top.url_image }}
                      style={styles.imageDressing}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* vetement bas */}
            <View style={styles.bottomContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {bottoms.map((bottom, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleBottomPress(bottom)}
                    onLongPress={() =>
                      navigation.navigate("ArticleScreen", {
                        item: bottom,
                      })
                    }
                  >
                    <Image
                      source={{ uri: bottom.url_image }}
                      style={styles.imageDressing}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* section sélection */}
          <View style={styles.selectContainer}>
            <Text>Votre sélection</Text>
            {/* {console.log("Affichage SELECTION")} */}
            <View style={styles.selectSubContainer}>
              {/* {console.log("Affichage selectedTop")} */}
              {selectedTop && (
                <View style={styles.imageContainer}>
                  <AntDesign
                    onPress={handleResetTop}
                    name="closecircle"
                    size={24}
                    color="black"
                  />
                  <Image
                    source={{ uri: selectedTop.url_image }}
                    style={styles.imageDressing}
                  />
                </View>
              )}
              {/* {console.log("Affichage selectedBottom")} */}
              {selectedBottom && (
                <View style={styles.imageContainer}>
                  <AntDesign
                    onPress={handleResetBottom}
                    name="closecircle"
                    size={24}
                    color="black"
                  />
                  <Image
                    source={{ uri: selectedBottom.url_image }}
                    style={styles.imageDressing}
                  />
                </View>
              )}
            </View>
          </View>

          {/* les boutons en bas de screen */}
          <View style={styles.buttonContainer}>
            {/* button 1 */}
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => console.log("Pressed => Sélectionner")}
            >
              <Text style={styles.buttonText}>Sélectionner</Text>
            </TouchableOpacity>

            {/* button 2 */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AddArticleScreen")}
            >
              <AntDesign name="pluscircle" size={50} color="#0E0E66" />
            </TouchableOpacity>

            {/* button 3 */}
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Accueil</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1.3,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#0E0E66",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  KeyboardAvoidingView: {
    flex: 1,
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  // scrollView: {
  //   flexGrow: 1,
  // },
  container: {
    flex: 12,
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    rowGap: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  dropdown: {
    height: 35,
    width: 200,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 16,
    textAlign: "left",
    marginLeft: 10,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  articlesContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "green",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "whitesmoke",
    // borderWidth: 2,
    // borderColor: "red",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "whitesmoke",

    // borderWidth: 2,
    // borderColor: "red",
  },
  imageDressing: {
    height: 130,
    width: 150,
    //resizeMode: "contain",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 8,
    height: "auto",
    padding: 20,
    alignItems: "center",
    gap: 10,
  },
  selectSubContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonLeft: {
    backgroundColor: "#FCA311",
    width: 130,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRight: {
    backgroundColor: "#FF4B8C",
    width: 130,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#0E0E66",
    fontWeight: "bold"
  }
});