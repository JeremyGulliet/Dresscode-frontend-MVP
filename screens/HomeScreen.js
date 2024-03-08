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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    // Fetch random top and bottom images for the first time
    if (firstLoad) {
      fetchRandomOutfit();
      setFirstLoad(false);
    }
  }, []);

  const fetchRandomOutfit = () => {
    fetch('http://192.168.1.41:3000/articles/random/tops')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setTopImage(data.imageUrl);
      })
      .catch((error) => console.error(error));

    fetch('http://192.168.1.41:3000/articles/random/bottoms')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setBottomImage(data.imageUrl);
      })
      .catch((error) => console.error(error));
  };

  const reloadOutfit = () => {
    fetchRandomOutfit();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          {/* ici le header */}
          <HeaderCompo />
        </View>

        <View style={styles.weatherContainer}>
          <Image
            style={styles.weatherImage}
            source={require('../assets/home/soleil-1.png')}
          ></Image>
          <Text style={styles.temperatureText}>Aujourd'hui 25°C</Text>
        </View>
        <View style={styles.clothingContainer}>
          <Image source={{ uri: topImage }} style={styles.clothingImage} />
          <Image source={{ uri: bottomImage }} style={styles.clothingImage} />
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
