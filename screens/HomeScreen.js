import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderCompo from '../components/headerCompo';
import * as Location from 'expo-location'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [topImage, setTopImage] = useState([]);
  const [bottomImage, setBottomImage] = useState([]);
  //const [firstLoad, setFirstLoad] = useState(true);

  const WEATHER_API_KEY = 'ce7418650c86eae6629dfcfdda141c14';

  const [myLatitude, setMyLatitude] = useState(null);
  const [myLongitude, setMyLongitude] = useState(null);
  const [myWeather, setMyWeather] = useState(null);
  const [myTemp, setMyTemp] = useState(0);
  const [myTempMin, setMyTempMin] = useState(0);
  const [myTempMax, setMyTempMax] = useState(0);



  // useEffect pour la géolocalisation et récupération de la LAT et LON pour l'API
  useEffect(() => {
    const fetchData = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
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
          //console.log(data.weather[0].main);
          setMyWeather(data.weather[0].main);
          setMyTemp(data.main.temp);
          setMyTempMin(data.main.temp_min);
          setMyTempMax(data.main.temp_max);
        } catch (error) {
          console.error('Erreur lors de la récupération de la météo :', error);
        }
      }
    };

    fetchWeather();
  }, [myLatitude, myLongitude]);

  //Choix de l'image à affiché selon la météo

  const getWeatherImagePath = (weather) => {
    switch (weather) {
      case 'Clear':
        return require('../assets/weather/Clear.png');
      case 'Clouds':
        return require('../assets/weather/BrokenClouds.png');
      case 'Rain':
        return require('../assets/weather/Rain.png');
      case 'Thunderstorm ':
        return require('../assets/weather/ThunderStorm.png');
      case 'Snow ':
        return require('../assets/weather/Snow.png');
      case 'Mist ':
        return require('../assets/weather/Rain.png');
      default:
        return require('../assets/weather/Default.png'); // Image par défaut si la météo n'est pas reconnue
    }
  };

  const weatherImagePath = myWeather ? getWeatherImagePath(myWeather) : null;


  useEffect(() => {
    fetchRandomOutfit();
  }, [])

  const fetchRandomOutfit = () => {
    fetch("http://192.168.1.41:3000/articles/dressing/hauts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Filtrer les éléments pour ne conserver que les hauts
        const hauts = data.filter(
          (item) => item.description && item.description.type === "haut"
        );
        //console.log("Data for tops:", hauts);
        setTopImage(hauts); // Définir uniquement les hauts dans l'état
      })
      .catch((error) => console.error("Error fetching tops:", error));

    fetch("http://192.168.1.41:3000/articles/dressing/bas")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Filtrer les éléments pour ne conserver que les bas
        const bas = data.filter(
          (item) => item.description && item.description.type === "bas"
        );
        //console.log("Data for bottoms:", bas);
        setBottomImage(bas); // Définir uniquement les bas dans l'état
      })
      .catch((error) => console.error("Error fetching tops:", error));
  };

  const reloadOutfit = () => {
    fetchRandomOutfit();
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          {/* ici le header */}
          <HeaderCompo navigation={navigation} />
        </View>
        {myWeather && (
          <View style={styles.weatherContainer}>
            <Image
              style={styles.weatherImage}
              source={weatherImagePath}
            ></Image>
            <Text style={styles.temperatureText}>Aujourd'hui {Math.round(myTemp)}°C</Text>
          </View>)}
        <View style={styles.clothingContainer}>
          {topImage.length > 0 && (
            <Image source={{ uri: topImage[Math.floor(Math.random() * topImage.length)].url_image }} style={styles.clothingImage} />
          )}
          {bottomImage.length > 0 && (
            <Image source={{ uri: bottomImage[Math.floor(Math.random() * bottomImage.length)].url_image }} style={styles.clothingImage} />
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
              source={require('../assets/home/chargement.png')}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigation.navigate('DressingScreen')}
          >
            <Text style={styles.buttonText}>Dressing</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>Valider proposition</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#0000ff',
    alignItems: 'center',
    height: 25,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  weatherContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  weatherImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  temperatureText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  clothingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  clothingImage: {
    height: 150,
    width: 200,
    resizeMode: 'contain',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 8,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    padding: 20,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#FCA311',
    padding: 15,
    borderRadius: 8,
    width: '85%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#FF4B8C',
    padding: 15,
    borderRadius: 8,
    width: '85%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  headerContainer: {
    height: 100,
  },
});
