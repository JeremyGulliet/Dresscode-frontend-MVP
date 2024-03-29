import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  backgroundImage
} from "react-native";

import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTshirt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function ImportScreen({ route, navigation }) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const { images } = route.params;

  const [newImages, setNewImages] = useState(images);

  const user = useSelector((state) => state.user.value);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, //Pour permettre la selection de plusieurs photos
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setNewImages([...newImages, ...selectedImages]);
    }
  };

  const handleImageSelection = async (imageUri) => {
    const formData = new FormData();
    const imageUriParts = imageUri.split(".");
    const fileType = imageUriParts[imageUriParts.length - 1];

    formData.append("photoFromFront", {
      uri: imageUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch(`${API_URL}/articles/import`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'image à Cloudinary");
      }
      const data = await response.json();
      const imageUrl = data.url;

      // Effectuer la suppression d'image au passage sur l'écran suivant
      const updatedImages = newImages.filter((img) => img !== imageUri);
      setNewImages(updatedImages);

      // Naviguer vers l'écran suivant avec l'URL de l'image
      navigation.navigate("ValidateImportScreen", {
        uri: imageUrl,
        newImages: updatedImages,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image à Cloudinary:", error);
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = newImages.filter(
      (_, index) => index !== indexToRemove
    );
    setNewImages(updatedImages);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>

      <View style={styles.headerContainer}>
        <HeaderCompo navigation={navigation} />
      </View>

      <View style={styles.contentContainer}>

        <TouchableOpacity onPress={pickImage} style={styles.addButton}>
          <FontAwesome name="plus" size={40} color="white" />
          <FontAwesome name="photo" size={40} color="white" />
        </TouchableOpacity>
        {newImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <TouchableOpacity onPress={() => handleImageSelection(image)}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={styles.removeButton}
            >
              <FontAwesome name="times-circle" size={30} color="#000000" />
            </TouchableOpacity>
          </View>
        ))}
      </View>


      <View style={styles.footer}>
        {/* Bouton "Go to DRESSING SCREEN" avec l'icône de vêtement */}
        <TouchableOpacity
          onPress={() => navigation.navigate("DressingScreen")}
        >
          <View style={styles.button}>
            <FontAwesomeIcon
              icon={faTshirt}
              size={20}
              style={[styles.icon, styles.whiteText]}
            />
            <Text
              style={[
                styles.buttonText,
                styles.buttonTextWhite,
                styles.boldText,
              ]}
            >
              Dressing de {user.username}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#0E0E66",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  // notifBar: {
  //   flex: 2,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "flex-end",
  //   backgroundColor: "#0E0E6661",
  //   // marginTop: 40,
  // },

  headerContainer: {
    flex: 1.5,
    // marginTop: 40,
  },

  contentContainer: {
    flex: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "whitesmoke",
    width: "100%",
    flexWrap: "wrap",
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 1,
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    padding: 2,
  },

  addButton: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E0E66",
    margin: 1,
    borderRadius: 10,
  },

  footer: {
    flex: 1.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E0F62",
  },
  footerText: {
    fontSize: 12,
  },
  icon: {
    marginRight: 10,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#D17D01",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonTextWhite: {
    color: "#fff",
  },

  whiteText: {
    color: "#fff",
  },
  boldText: {
    fontWeight: "bold",
  },
  textOutline: {
    // Style du contour
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
