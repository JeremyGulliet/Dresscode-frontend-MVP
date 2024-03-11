import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderCompo from "../components/headerCompo.js";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";

export default function AddArticleScreen({ navigation }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access media library is required!");
        }
      }
    })();
  }, []);

  const handleImport = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true, //Pour editer la photo selectionnée. ATTENTION, il faut le commenter si on décommente "allowMiltipleSelection"
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, //Pour permettre la selection de plusieurs photos
    });

    //console.log(result.assets[0]);
    //console.log(result.assets[1].uri);

    if (!result.canceled) {
      // Récupérer les URLs des images sélectionnées
      const selectedImages = result.assets.map((asset) => asset.uri);
      navigation.navigate("ImportScreen", { images: selectedImages });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.notifBar}>
        <View style={styles.headerContainer}>
          <HeaderCompo navigation={navigation} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Dressing vide</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CameraScreen")}
                style={styles.buttonContent}
              >
                <FontAwesome
                  name="camera-retro"
                  size={70}
                  color="#000000"
                  style={styles.icon}
                />
                <Text style={styles.text}>Appareil Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.importContainer}>
              <TouchableOpacity
                onPress={handleImport}
                style={styles.buttonContent}
              >
                <FontAwesome
                  name="upload"
                  size={70}
                  color="#000000"
                  style={styles.icon}
                />
                <Text style={styles.text}>Importer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
    // marginTop: 40,
  },

  headerContainer: {
    flex: 1,
    marginTop: 40,
  },

  contentContainer: {
    flex: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  container: {
    display: "flex",
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  title: {
    fontSize: 30,
    // marginTop: 300,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },

  cameraContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },

  importContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    marginLeft: 60,
    fontSize: 20,
  },

  icon: {
    marginRight: 10,
  },
});
