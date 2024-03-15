import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ImageBackground,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native"; // Import du hook useNavigation pour la navigation
import { useDispatch } from "react-redux"; // Import de useDispatch pour envoyer des actions Redux
import { login } from "../reducers/user"; // Import de l'action login depuis le reducer user

import backgroundImage from "../assets/home/Dressing.jpg.webp";

const SignInScreen = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [email, setEmail] = useState(""); // État local pour stocker l'email
  const [password, setPassword] = useState(""); // État local pour stocker le mot de passe
  const [userError, setUserError] = useState(false);

  const navigation = useNavigation(); // Initialisation du hook useNavigation
  const dispatch = useDispatch(); // Initialisation du hook useDispatch pour envoyer des actions Redux

  const handleSignIn = () => {
    // Fonction pour gérer la connexion
    // Envoi des données de connexion au backend
    setUserError(false);
    fetch(`${API_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la connexion");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Si la connexion réussit, mise à jour de l'état de l'utilisateur et navigation vers l'écran d'accueil
        if (data.result) {
          dispatch(
            login({ token: data.token, username: data.username, email: email })
          ); // Dispatch de l'action login avec le token, le nom d'utilisateur et l'email
          navigation.navigate("Home"); // Navigation vers l'écran d'accueil
          setEmail("");
          setPassword("");
        } else {
          setUserError(true);
          console.error("Erreur lors de la connexion: ", data.error); // Affichage de l'erreur dans la console
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error.message); // Affichage de l'erreur dans la console
      });
  };

  return (
    <ImageBackground
      source={require("../assets/home/Dressing.jpg.webp")}
      // imageStyle={{ opacity: 0.7 }}
      style={styles.backgroundImage}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.logoContainer}>
          {/* Affichage du logo */}
          <View style={styles.logoBackground}>
            <Image
              source={require("../assets/DressCodeLogo.png")}
              style={styles.logo}
            />
          </View>
        </View>
        {/* Champs de saisie pour la connexion */}
        <View style={styles.userInterface}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry // Pour masquer le texte saisi
          />
          {userError && (
            <Text style={styles.error}>
              Utilisateur inconnu ou mot de passe incorrect
            </Text>
          )}
          <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
            <Text style={styles.btnText}>Connexion</Text>
          </TouchableOpacity>

          {/* Lien vers la page d'inscription */}
          <TouchableOpacity
            style={styles.loginTextContainer}
            onPress={() => navigation.navigate("SignUp")}
          >
            <View style={styles.normalText}>
              <Text style={styles.login}>Pas encore inscrit ? </Text>
            </View>
            <View style={styles.underlineTextView}>
              <Text style={styles.underlineText}>S'inscrire</Text>
            </View>
          </TouchableOpacity>

          {/* Images des logos de connexion */}
          {/* <View style={styles.loginLogo}>
            <Image
              source={require("../assets/loginMicrosoft.png")}
              style={{ width: 50, height: 50 }}
            />
            <Image
              source={require("../assets/loginGoogle.png")}
              style={{ width: 50, height: 50 }}
            />
            <Image
              source={require("../assets/loginApple.png")}
              style={{ width: 50, height: 50 }}
            />
          </View> */}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SignInScreen;

// Styles CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "rgba(245, 245, 245, 0.6)",
    // borderRadius: 8,
  },

  logoContainer: {
    flex: 1.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    // borderWidth: 2,
    // borderColor: "red",
  },

  logoBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 160,
    backgroundColor: "rgba(245, 245, 245, 0.9)",
    borderRadius: 8,
  },
  logo: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    // borderWidth: 2,
    // borderColor: "green",
  },
  userInterface: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "green",
  },

  input: {
    height: 60,
    width: 350,
    backgroundColor: "white",
    color: "black",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    opacity: 1,
  },
  btn: {
    paddingVertical: 18,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#0E0E66",
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
  register: {
    marginBottom: 30,
    color: "gray",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  // Style du lien vers la page de connexion
  loginTextContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  login: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  underlineTextView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "white",
  },
  underlineText: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 16,
  },
  // loginLogo: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingBottom: 30,
  //   resizeMode: "contain",
  // },
  error: {
    color: "red",
    backgroundColor: "rgba(245, 245, 245, 0.85)",
    borderRadius: 8,
    textAlign: "center",
  },
});