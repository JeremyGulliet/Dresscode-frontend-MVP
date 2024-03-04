import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseDispatch } from 'react-redux';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = () => {
    // Envoi des données d'inscription au backend
    fetch('URL_DU_BACKEND', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
          throw new Error('Erreur lors de la requête');
        }
        return response.json();
      })
      .then((data) => {
        // Gestion de la réponse du backend
        console.log(data);
        data.result && dispatch(login({ token: data.token, username, email }));
        navigation.navigate('AddArticleScreen');
      })
      .catch((error) => {
        // Gestion des erreurs de requête
        console.error("Erreur lors de l'inscription:", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Affichage du logo */}
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 250, height: 150 }}
        ></Image>
      </View>

      <View>
        {/* Champs de saisie pour l'inscription */}
        <TextInput
          style={styles.input}
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* Bouton pour l'inscription */}
        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    // Style des champs de saisie
    height: 60,
    width: 350,
    backgroundColor: '#e5e6e6',
    color: 'black',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  btn: {
    // Style du bouton d'inscription
    paddingVertical: 18,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#0E0E66',
  },
  btnText: {
    // Style du texte du bouton d'inscription
    fontSize: 16,
    color: 'white',
  },
  login: {
    // Style du lien vers la page de connexion
    marginBottom: 30,
    color: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  loginLogo: {
    // Style de la section des logos de connexion
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SignUp;
