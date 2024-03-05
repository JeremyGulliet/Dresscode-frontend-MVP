import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TemplateHeaderFooterScreen from './TemplateHeaderFooterScreen';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TemplateHeaderFooterScreen></TemplateHeaderFooterScreen>
      </View>
      <View style={styles.weatherContainer}>
        <Text style={styles.sunIcon}>☀️</Text>
        <Text style={styles.temperatureText}>Aujourd'hui 18-25°C</Text>
      </View>
      <View style={styles.clothingContainer}>
        <Image
          source={require('../assets/home/vet-haut.png')}
          style={styles.clothingImage}
        />
        <Image
          source={require('../assets/home/vet-bas.png')}
          style={styles.clothingImage}
        />
        <Image
          source={require('../assets/home/vet-chauss.png')}
          style={styles.clothingImage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>Dressing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>Valider proposition</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
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
  },
  sunIcon: {
    fontSize: 30,
  },
  temperatureText: {
    fontSize: 20,
    color: 'black',
  },
  clothingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  clothingImage: {
    height: 120,
    width: 195,
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
    width: '90%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#FF4B8C',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;
