import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraType, FlashMode, AutoFocus } from "expo-camera";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CameraScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  //const [urlPhoto, setUrlPhoto] = useState("");

  let cameraRef = useRef(null);

  // Autorisation pour utiliser l'appareil photo
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Fonction pour la prise de photo et l'envoi sur Cloudinairy
  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({
      quality: 0.3,
    });
    //console.log(photo);
    const uri = photo.uri;

    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    console.log(formData);

    fetch("http://192.168.1.42:3000/articles/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("La data de l'upload :", data);
        //setUrlPhoto(data.url)
        navigation.navigate("ValidateCameraScreen", { url: data.url });
      })
      .catch((error) => console.error("Erreur fetch de l'upload :", error));
  };
  // Désactiver la caméra en arrière plan quand changement d'écran
  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <Camera
      type={type}
      flashMode={flashMode}
      ref={(ref) => (cameraRef = ref)}
      style={styles.camera}
      autoFocus={AutoFocus.on}
    >
      {/* Boutons Flash et changement de camera */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
          style={styles.button}
        >
          <FontAwesome name="rotate-right" size={25} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
            )
          }
          style={styles.button}
        >
          <FontAwesome
            name="flash"
            size={25}
            color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
          />
        </TouchableOpacity>
      </View>
      {/* Boutons retour arrière et prise de photo*/}
      <View style={styles.bottomContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-circle-left" size={50} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.snapContainer}>
          <TouchableOpacity onPress={() => cameraRef && takePicture()}>
            <FontAwesome name="circle-thin" size={95} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    marginRight: 50,
  },

  backContainer: {
    marginRight: 100,
  },

  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    marginRight: 100,
    marginBottom: 50,
  },
});
