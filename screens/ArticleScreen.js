import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";

import { useSelector } from "react-redux";
import HeaderCompo from "../components/headerCompo";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export default function ArticleScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  console.log("test");

  const { item } = route.params ? route.params : { item: null }; // Vérification de route.params
  console.log({ item });

  // Fonction pour revenir vers dressing
  const handleBackPress = () => {
    navigation.navigate("DressingScreen");
  };

  const handleDelete = () => {
    fetch(`${API_URL}/users/deleteArticle/${user.token}/${item._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Article supprimé avec succès");
          navigation.navigate("DressingScreen");
        } else {
          console.error("Échec de la suppression de l'article");
          // Gérez les erreurs en conséquence
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'article:", error);
        // Gérez les erreurs en conséquence
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <HeaderCompo navigation={navigation} />
      </View>

      <View style={styles.contentContainer}>
        {/* image en détail */}
        <View style={styles.imgContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons
              onPress={handleBackPress}
              name="arrow-back"
              size={30}
              color="#0E0E66"
            />
          </TouchableOpacity>
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
        <View style={styles.globalContentContainer}>
          <View style={styles.textContainer}>
            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Catégorie : </Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {item?.description?.category}
                </Text>
              </View>
            </View>

            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Type :</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {" "}
                  {item?.description?.type}
                </Text>
              </View>
            </View>

            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Couleur :</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {" "}
                  {item?.description?.color}
                </Text>
              </View>
            </View>

            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Taille :</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {" "}
                  {item?.description?.size}
                </Text>
              </View>
            </View>

            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Activité :</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {" "}
                  {item?.description?.event}
                </Text>
              </View>
            </View>

            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Marque :</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}> {item?.brand?.name}</Text>
              </View>
            </View>

            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Météo:</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}> {item?.weather?.type}</Text>
              </View>
            </View>

            <View style={styles.text}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Température minimale:</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {" "}
                  {item?.weather?.temp_min}
                </Text>
              </View>
            </View>

            <View style={styles.textLastElement}>
              <View style={styles.titleView}>
                <Text style={styles.title}>Température maximale:</Text>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.description}>
                  {" "}
                  {item?.weather?.temp_max}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.deleteIcon}>
            <View style={styles.trashText}>
              <TouchableOpacity style={styles.trashContainer}>
                <Ionicons
                  onPress={handleDelete}
                  name="trash"
                  size={35}
                  color="#0E0E66"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
  // notifBar: {
  //   flex: 2,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "flex-end",
  //   backgroundColor: "#0E0E6661",
  //   // marginTop: 40,
  // },

  headerContainer: {
    flex: 1.3,
    // marginTop: 40,
  },

  contentContainer: {
    flex: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
  },
  mainContent: {
    flex: 12,
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    rowGap: 20,
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
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
  },

  imageDressing: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    borderRadius: 8,
    marginHorizontal: 10,
  },

  globalContentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1.2,
    height: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // borderColor: "red",
    // borderWidth: 2,
  },
  text: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  textLastElement: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0,
  },
  titleView: {
    flex: 1.4,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0E0E66",
  },
  descriptionView: {
    flex: 0.75,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 15,
    // borderColor: "black",
    // borderWidth: 2,
  },

  description: {
    fontSize: 16,
    color: "#0E0E66",
    // marginLeft: 50,
  },

  deleteIcon: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItem: "center",
    // borderColor: "red",
    // borderWidth: 2,
  },
  trashContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 2,
  },
  trashText: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    // borderColor: "red",
    // borderWidth: 2,
  },
});