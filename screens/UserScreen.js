import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTshirt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// Importez votre image
import backgroundImage from "../assets/home/Dressing.jpg.webp";

export default function UserScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Fonction de déconnexion
  const handleLogout = () => {
    dispatch(logout());
    console.log("Utilisateur déconnecté");
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground source={backgroundImage} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.whiteText]}>DressCode</Text>
          {/* Logo cliquable pour la déconnexion */}
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size={20}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Contenu */}
        <View style={styles.content}>
          <View style={styles.welcomeContainer}>
            {/* Utilisation d'un seul Text avec un style de contour */}
            <Text style={[styles.welcomeText, styles.textOutline]}>
              Bienvenue, {user.username} !
            </Text>
          </View>
        </View>

        {/* Footer */}
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
                {user.username}'s Dressing
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,

    backgroundColor: "#0E0E66",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  container: {
    flex: 12,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#0E0F62",

    // borderWidth: 2,
    // borderColor: "red",
  },
  header: {
    flex: 1.3,
    width: "100%",
    backgroundColor: "#0E0F62",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "red",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  whiteText: {
    color: "#fff",
  },
  boldText: {
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  welcomeContainer: {
    alignItems: "flex-start",
    marginLeft: 50,
    marginTop: 40,
  },
  content: {
    flex: 12,
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "red",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#F0A73E",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonTextWhite: {
    color: "#fff",
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
  },
  logoutIcon: {
    color: "#fff",
  },
  textOutline: {
    // Style du contour
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
