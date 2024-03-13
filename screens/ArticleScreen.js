import { Button, StyleSheet, Text, View, Image } from "react-native";

import { useSelector } from "react-redux";

export default function ArticleScreen({ navigation, route }) {
  const { url, ID } = route.params;
  const user = useSelector(state => state.user.value);
  const API_URL = process.env.API_URL;

  const handleDelete = () => {

    fetch(`${API_URL}/users/deleteArticle/${user.token}/${ID}`, {
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
    <View style={styles.container}>
      <Text>Article SCREEN</Text>
      <Image source={{ uri: url }} style={styles.imageDressing} />
      <Button
        title="Go To Dressing"
        onPress={() => navigation.navigate("DressingScreen")}
      />
      <Button
        title="DELETE ARTICLE"
        onPress={() => handleDelete()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageDressing: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    borderRadius: 8,
    marginHorizontal: 10,
  },
});
