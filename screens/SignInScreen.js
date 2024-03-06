import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'; // Import du hook useNavigation pour la navigation
import { useDispatch } from 'react-redux'; // Import de useDispatch pour envoyer des actions Redux
import { login } from '../reducers/user'; // Import de l'action login depuis le reducer user

const SignInScreen = () => {
  const [email, setEmail] = useState(""); // État local pour stocker l'email
  const [password, setPassword] = useState(""); // État local pour stocker le mot de passe

  const navigation = useNavigation(); // Initialisation du hook useNavigation
  const dispatch = useDispatch(); // Initialisation du hook useDispatch pour envoyer des actions Redux

  const handleSignIn = () => {
    // Fonction pour gérer la connexion
    // Envoi des données de connexion au backend
    fetch("http://192.168.1.41:3000/users/signin", {
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
          console.error("Erreur lors de la connexion: ", data.error); // Affichage de l'erreur dans la console
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error.message); // Affichage de l'erreur dans la console
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 250, height: 150 }}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry // Pour masquer le texte saisi
          />
          <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
            <Text style={styles.btnText}>Connexion</Text>
          </TouchableOpacity>
          <Text
            style={styles.register}
            onPress={() => navigation.navigate('SignUp')}
          >
            Pas encore inscrit ? S'inscrire
          </Text>
          <View style={styles.loginLogo}>
            {/* Images des logos de connexion */}
            <Image
              source={require('../assets/loginMicrosoft.png')}
              style={{ width: 50, height: 50 }}
            />
            <Image
              source={require('../assets/loginGoogle.png')}
              style={{ width: 50, height: 50 }}
            />
            <Image
              source={require('../assets/loginApple.png')}
              style={{ width: 50, height: 50 }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

// Styles CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },

  logoContainer: { justifyContent: 'center', alignItems: 'center' },
  logo: { width: 250, height: 250, resizeMode: 'contain' },
  input: {
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
  loginLogo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
    resizeMode: 'contain',
  },
});
