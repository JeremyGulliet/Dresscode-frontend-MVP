import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import HeaderCompo from "../components/headerCompo.js";
import * as ImagePicker from "expo-image-picker";

import backgroundImage from "../assets/dressing/Dressing3.webp";

export default function AddArticleScreen({ navigation }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access media library is required!");
        }
      }
    })();
  }, []);

  const handleImport = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      navigation.navigate("ImportScreen", { images: selectedImages });
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.mainContainer}>
        <View style={styles.notifBar}>
          <View style={styles.headerContainer}>
            <HeaderCompo navigation={navigation} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* <Text style={[styles.title, styles.boldText]}>Que souhaitez-vous faire ?</Text> */}
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <View style={styles.cameraContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")} style={styles.buttonContent}>
                  <FontAwesome5 name="camera-retro" size={70} color="#000000" style={styles.icon} />
                  <Text style={styles.text}>Appareil Photo</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.importContainer}>
                <TouchableOpacity onPress={handleImport} style={styles.buttonContent}>
                  <FontAwesome5 name="upload" size={70} color="#000000" style={styles.icon} />
                  <Text style={styles.text}>Importer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("DressingScreen")} style={styles.dressingButton}>
            <FontAwesome5 name="tshirt" size={20} color="white" style={styles.icon2} />
            <Text style={styles.footerText}>Dressing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",

  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  notifBar: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#0E0E66",
  },
  headerContainer: {
    flex: 1,
    marginTop: 20, // Réduit la marge supérieure
    alignItems: "center",
    justifyContent: "center",

  },
  contentContainer: {
    flex: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Opacité ajoutée pour améliorer la visibilité du texte
    width: "100%",
  },
  container: {
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
    height: "75%", // Réduit la hauteur
    marginBottom: 50, // Réduit la marge inférieure
  },
  title: {
    fontSize: 20, // Réduit la taille de la police
    textAlign: "center",
  },
  boldText: {
    fontWeight: 'bold', // Mettre le texte en gras
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10, // Réduit la marge supérieure
  },
  cameraContainer: {
    marginVertical: 35,
    padding: 10,
    backgroundColor: "#D17D01",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center", // Centrer horizontalement
    justifyContent: "center", // Centrer verticalement
    width: 120, // Réduire la largeur
    height: 120, // Réduire la hauteur
  },
  importContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#D17D01",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center", // Centrer horizontalement
    justifyContent: "center", // Centrer verticalement
    width: 120, // Réduire la largeur
    height: 120, // Réduire la hauteur
  },
  text: {
    marginTop: 5, // Réduire l'espacement au-dessus du texte
    fontSize: 14, // Réduire la taille de la police
    color: "#212155"
  },
  icon: {
    marginBottom: 5, // Réduire l'espacement en dessous de l'icône
    alignSelf: "center", // Centrer horizontalement
    color: "#212155",
  },

  icon2: {

    marginBottom: 5, // Réduire l'espacement en dessous de l'icône
    alignSelf: "center", // Centrer horizontalement
    color: "white",
  },

  footerContainer: {
    backgroundColor: "#212155",
    paddingVertical: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white",
    fontSize: 16,
  },
  dressingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D17D01",
    borderRadius: 5,
    height: 40,
    width: 170,
  },
});