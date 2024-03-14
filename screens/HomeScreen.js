import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderCompo from "../components/headerCompo";

import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import FooterCompo from "../components/footerCompo";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [topImage, setTopImage] = useState([]);
  const [bottomImage, setBottomImage] = useState([]);
  //const [firstLoad, setFirstLoad] = useState(true);
  const user = useSelector((state) => state.user.value);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

  const [myLatitude, setMyLatitude] = useState(null);
  const [myLongitude, setMyLongitude] = useState(null);
  const [myWeather, setMyWeather] = useState(null);
  const [myTemp, setMyTemp] = useState(0);
  const [myTempMin, setMyTempMin] = useState(0);
  const [myTempMax, setMyTempMax] = useState(0);
  const [city, setCity] = useState(null);

  let focus = useIsFocused();

  // useEffect pour la géolocalisation et récupération de la LAT et LON pour l'API
  useEffect(() => {
    const fetchData = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      //console.log("Status received")
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setMyLatitude(location.coords.latitude);
        setMyLongitude(location.coords.longitude);
      }
    };
    fetchData();
  }, []);

  // fonction pour afficher la météo locale selon LAT et LON
  useEffect(() => {
    const fetchWeather = async () => {
      if (myLatitude !== null && myLongitude !== null) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&appid=${WEATHER_API_KEY}&units=metric`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          // Arrondir temp_min à la valeur en dessous
          const tempMinRounded = Math.floor(data.main.temp_min);
          // Arrondir temp_max à la valeur du dessus
          const tempMaxRounded = Math.ceil(data.main.temp_max);

          setMyWeather(data.weather[0].main);
          setMyTemp(data.main.temp);
          setMyTempMin(tempMinRounded);
          setMyTempMax(tempMaxRounded);
          setCity(data.name);
        } catch (error) {
          console.error("Erreur lors de la récupération de la météo :", error);
        }
      }
    };

    fetchWeather();
  }, [myLatitude, myLongitude]);

  //Choix de l'image à affiché selon la météo

  const getWeatherImagePath = (weather) => {
    switch (weather) {
      case "Clear":
        return require("../assets/weather/Clear.png");
      case "Clouds":
        return require("../assets/weather/BrokenClouds.png");
      case "Rain":
        return require("../assets/weather/Rain.png");
      case "Thunderstorm ":
        return require("../assets/weather/ThunderStorm.png");
      case "Snow ":
        return require("../assets/weather/Snow.png");
      case "Mist ":
        return require("../assets/weather/Rain.png");
      default:
        return require("../assets/weather/Default.png"); // Image par défaut si la météo n'est pas reconnue
    }
  };

  useEffect(() => {
    // Assurez-vous que myWeather, myTempMin et myTempMax ont des valeurs avant d'appeler fetchArticles
    if (myWeather !== null && myTempMin !== 0 && myTempMax !== 0) {
      fetchArticles();
    }
  }, [myWeather, myTempMin, myTempMax]); // Exécutez lorsque ces valeurs changent

  const fetchArticles = () => {
    const queryString = `type=${myWeather}&temp_Min=${myTempMin}&temp_Max=${myTempMax}`;

    fetch(
      `${API_URL}/articles/dressing/homeArticle/${user.token}?${queryString}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Articles trouvés:");
        const tops = [];
        const bottoms = [];
        data.forEach((article) => {
          //console.log("Description de l'article:", article)
          if (article.description.category === "Haut") {
            console.log("FETCH DATA RESULT : ", article);
            tops.push(article);
          } else if (article.description.category === "Bas") {
            bottoms.push(article);
          }
        });

        setTopImage(tops);
        setBottomImage(bottoms);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles:", error);
      });
  };

  const weatherImagePath = myWeather ? getWeatherImagePath(myWeather) : null;

  const reloadOutfit = () => {
    fetchArticles();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <View style={styles.headerContainer}>
          {/* ici le header */}
          <HeaderCompo navigation={navigation} />
        </View>

        <View style={styles.contentContainer}>
          {myWeather && (
            <View style={styles.weatherContainer}>
              <Image
                style={styles.weatherImage}
                source={weatherImagePath}
              ></Image>
              <Text style={styles.temperatureText}>
                {city} {Math.round(myTemp)}°C
              </Text>
            </View>
          )}
          <View style={styles.clothingContainer}>
            {topImage.length > 0 && (
              <Image
                source={{
                  uri: topImage[Math.floor(Math.random() * topImage.length)]
                    .url_image,
                }}
                style={styles.clothingImage}
              />
            )}
            {bottomImage.length > 0 && (
              <Image
                source={{
                  uri: bottomImage[
                    Math.floor(Math.random() * bottomImage.length)
                  ].url_image,
                }}
                style={styles.clothingImage}
              />
            )}
            {/* <Image
            source={require('../assets/home/vet-chauss.png')}
            style={styles.clothingImage}
          /> */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={reloadOutfit}>
              <Image
                style={styles.reload}
                source={require("../assets/home/chargement.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate("DressingScreen")}
            >
              <Text style={styles.buttonText}>Dressing</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>Valider proposition</Text>
          </TouchableOpacity> */}
          </View>
        </View>
        <FooterCompo navigation={navigation} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  headerContainer: {
    flex: 1.3,
    // borderColor: "red",
    // borderWidth: 2,
  },
  // header: {
  //   padding: 20,
  //   backgroundColor: "#0000ff",
  //   alignItems: "center",
  //   height: 25,
  // },
  headerText: {
    color: "white",
    fontSize: 24,
  },

  contentContainer: {
    flex: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  weatherContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "whitesmoke",
    justifyContent: "space-around",
    // borderColor: "blue",
    // borderWidth: 2,
  },
  weatherImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  temperatureText: {
    fontSize: 20,
    marginBottom: 20,
    color: "black",
  },
  clothingContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  clothingImage: {
    height: 150,
    width: 200,
    resizeMode: "contain",
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 8,
  },
  buttonContainer: {
    justifyContent: "space-around",
    padding: 20,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#FCA311",
    padding: 15,
    borderRadius: 8,
    width: "85%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#FF4B8C",
    padding: 15,
    borderRadius: 8,
    width: "85%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
});
