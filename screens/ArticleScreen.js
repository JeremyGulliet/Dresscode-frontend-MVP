import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useSelector } from "react-redux";
import HeaderCompo from "../components/headerCompo";
import { Ionicons } from "@expo/vector-icons";

export default function ArticleScreen({ navigation, route }) {
  const user = useSelector(state => state.user.value);
  const API_URL = process.env.API_URL;
  const { item } = route.params ? route.params : { item: null }; // Vérification de route.params
  console.log({ item });

  // Fonction pour revenir vers dressing
  const handleBackPress = () => {
    navigation.navigate("DressingScreen");
  };

  const handleDelete = () => {

    fetch(`${API_URL}/users/deleteArticle/${user.token}/${item._id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log("Article supprimé avec succès");
          navigation.navigate('DressingScreen')
        } else {
          console.error("Échec de la suppression de l'article");
          // Gérez les erreurs en conséquence
        }
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'article:", error);
        // Gérez les erreurs en conséquence
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.headerContainer}>
            <HeaderCompo navigation={navigation} />
          </View>

          <View style={styles.imgContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                onPress={handleBackPress}
                name="arrow-back"
                size={30}
                color="black"
              />
            </View>
            {/* Afficher l'image */}
            {item && item.url_image ? (
              <Image
                source={{ uri: item.url_image }}
                style={styles.imageDressing}
              />
            ) : (
              <Image
                source={require("../assets/dressing/top-04.png")}
                style={styles.imageDressing}
              />
            )}
          </View>

          <Button
            title="Go To Dressing"
            onPress={() => navigation.navigate("DressingScreen")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  imgContainer: {
    backgroundColor: "grey",
    paddingVertical: 20,
    width: "100%",
    borderBottomWidth: 1.5,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
  },

  imageDressing: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    borderRadius: 8,
    marginHorizontal: 10,
  },
});
