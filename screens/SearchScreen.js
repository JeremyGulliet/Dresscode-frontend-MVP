import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { API_URL } from "../constants/config";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderCompo from "../components/headerCompo";

export default function SearchScreen({ navigation }) {
  const [articles, setArticles] = useState([]); // État pour stocker les articles récupérés
  const [search, setSearch] = useState("");

  // Fonction pour effectuer la recherche d'articles
  const handleSearch = async () => {
    try {
      console.log(search); // Afficher la valeur de search dans la console
      const response = await fetch(`${API_URL}/articles/${search}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des articles");
      }
      const articlesData = await response.json();
      setArticles(articlesData); // Mettre à jour l'état avec les articles récupérés
    } catch (error) {
      console.error("Erreur");
    }
  };
  console.log(articles);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <HeaderCompo />
          {/* <Text style={styles.headerText}>My Search Screen</Text> */}
        </View>

        {/* Input et bouton de recherche */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#ccc"
            onChangeText={(value) => setSearch(value)}
            value={search}
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>

        {/* Affichage des articles récupérés */}
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.articlesContainer}>
            {articles.map((article, i) => (
              // console.log(article.url_image),
              <View style={styles.imageView}>
                <Image
                  key={i}
                  source={{ uri: article.url_image }}
                  style={styles.articleImage}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.goToDressingButton}
            onPress={() => navigation.navigate("DressingScreen")}
          >
            <Text style={styles.goToDressingButtonText}>Go To Dressing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0E0E66",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    justifyContent: "space-between",
  },

  header: {
    backgroundColor: "#0E0F62",
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // headerText: {
  //   color: "#fff",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20, // Ajouter un padding horizontal pour l'espace sur les côtés
  },

  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#F0A73E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },

  buttonText: {
    color: "#fff",
  },

  articlesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "space-evenly",
    flexWrap: "wrap",
    width: "100%",
    // borderColor: "black",
    // borderWidth: 2,
  },
  imageView: {
    width: 150,
    height: 150,
    borderColor: "#0E0E6661",
    margin: 10,
    padding: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#0E0E66",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  goToDressingButton: {
    backgroundColor: "#F0A73E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  goToDressingButtonText: {
    display: "flex",
    color: "#fff",
    backgroundColor: "#F0A73E",
    alignItems: "center",
  },

  articleImage: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },

  article: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },

  article: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
});
