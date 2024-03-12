import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { API_URL } from "../config";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SearchScreen({ navigation }) {
  const [articles, setArticles] = useState([]); // État pour stocker les articles récupérés
  const [search, setSearch] = useState("");
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Search Screen</Text>
      </View>
      return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Search Screen</Text>
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
        <View style={styles.articlesContainer}>
          {articles.map(
            (article, i) => (
              console.log(article.url_image),
              (
                <Image
                  key={i}
                  source={{ uri: article.url_image }}
                  style={styles.articleImage}
                />
              )
            )
          )}
        </View>
        {/* Affichage des articles récupérés */}
        <View style={styles.articlesContainer}>
          {articles.map(
            (article, i) => (
              console.log(article.url_image),
              (
                <Image
                  key={i}
                  source={{ uri: article.url_image }}
                  style={styles.articleImage}
                />
              )
            )
          )}
        </View>

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
      );
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
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
  header: {
    backgroundColor: "#0E0F62",
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20, // Ajouter un padding horizontal pour l'espace sur les côtés
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "#F0A73E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
  buttonText: {
    color: "#fff",
  },

  articlesContainer: {
    flex: 1,
  },
  articlesContainer: {
    flex: 1,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
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
  goToDressingButtonText: {
    display: "flex",
    color: "#fff",
    backgroundColor: "#F0A73E",
    alignItems: "center",
  },

  articlesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  articlesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  articleImage: {
    height: 20,
    width: 20,
  },
  articleImage: {
    height: 20,
    width: 20,
  },

  article: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  article: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
