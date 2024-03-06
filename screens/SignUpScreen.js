import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleRegister = () => {
    // Envoi des données d'inscription au backend
    fetch("http://192.168.1.138:3000/users/signup", {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          {/* Affichage du logo */}
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          ></Image>
        </View>

        <View>
          {/* Champs de saisie pour l'inscription */}
          <TextInput
            style={styles.input}
            placeholder='Username'
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
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
            secureTextEntry
          />
          {/* Bouton pour l'inscription */}
          <TouchableOpacity style={styles.btn} onPress={() => handleRegister()}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
          {/* Lien vers la page de connexion */}
          <Text
            style={styles.login}
            onPress={() => navigation.navigate('SignIn')}
          >
            Déjà inscrit ? Connexion
          </Text>
          {/* Affichage des logos de connexion */}
          <View style={styles.loginLogo}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
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
  login: {
    // Style du lien vers la page de connexion
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
