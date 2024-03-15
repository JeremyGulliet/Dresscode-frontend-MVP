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
import { useNavigation } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useSelector } from "react-redux";

// Établissement des expressions régulières

// Username : au moins 3 caractères avec obligatoirement une lettre au début et possibilité d'utiliser des minuscule ou majusctules, des chiffres et seulement le caractère simple tiret ou un espace
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9 -]{2,}$/;

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Mot de passe :  de 6 à 12 caractères, comprenant au moins une lettre, un chiffre et un caractère spécial
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;

const SignUp = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleRegister = () => {
    // Réinitialisation des erreurs
    setEmailError(false);
    setPasswordError(false);
    setUsernameError(false);

    // Vérification du format de l'email
    if (!EMAIL_REGEX.test(email)) {
      console.log("- Format EMAIL non respecté -");
      setEmailError(true);
    }

    // Vérification du format du mot de passe
    if (!PASSWORD_REGEX.test(password)) {
      console.log("- Format MOT DE PASSE non respecté -");
      setPasswordError(true);
    }

    // Vérification du format du username
    if (!USERNAME_REGEX.test(username)) {
      console.log("- Format USERNAME non respecté -");
      setUsernameError(true);
    }

    // Envoi des données d'inscription au backend

    if (
      !emailError &&
      !passwordError &&
      !usernameError &&
      EMAIL_REGEX.test(email) &&
      PASSWORD_REGEX.test(password) &&
      USERNAME_REGEX.test(username)
    ) {
      fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          // Vérification de la réponse du backend
          if (!response.ok) {
            throw new Error("Erreur lors de la requête");
          }
          return response.json();
        })
        .then((data) => {
          // Gestion de la réponse du backend
          console.log(data);
          if (data.result) {
            dispatch(login({ token: data.token, username, email }));
            navigation.navigate("AddArticleScreen");
            setEmail("");
            setPassword("");
            setUsername("");
          } else {
            console.error("Erreur lors de l'inscription: ", data.error);
          }
        })
        .catch((error) => {
          // Gestion des erreurs de requête
          console.error("Erreur lors de l'inscription:", error.message);
        });
    }
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

        {/* Champs de saisie pour l'inscription */}
        <View style={styles.userInterface}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
          {usernameError && (
            <Text style={styles.error}>Champ vide ou format non valide</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Email ( mail@monmail.fr )"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          {emailError && (
            <Text style={styles.error}>
              Champ vide ou format adresse mail non valide
            </Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
          {passwordError && (
            <Text style={styles.error}>
              Champ vide ou format de mot de passe non valide
            </Text>
          )}
          {/* Bouton pour l'inscription */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleRegister()}
          >
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
          {/* Lien vers la page de connexion */}
          <TouchableOpacity
            style={styles.loginTextContainer}
            onPress={() => navigation.navigate("SignIn")}
          >
            <View style={styles.normalText}>
              <Text style={styles.login}>Déjà inscrit ? </Text>
            </View>
            <View style={styles.underlineTextView}>
              <Text style={styles.underlineText}>Connexion</Text>
            </View>
          </TouchableOpacity>

          {/* Affichage des logos de connexion */}
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

export default SignUp;

const styles = StyleSheet.create({

  // scrollView: {
  //   flex: 1,
  // },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
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

  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  input: {
    // Style des champs de saisie
    height: 60,
    width: 350,
    backgroundColor: "#e5e6e6",
    color: "black",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  btn: {
    // Style du bouton d'inscription
    paddingVertical: 18,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#0E0E66",
  },
  btnText: {
    // Style du texte du bouton d'inscription
    fontSize: 16,
    color: "white",
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
