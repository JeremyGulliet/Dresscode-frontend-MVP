import { Button, StyleSheet, Text, View, Image } from "react-native";

export default function ArticleScreen({ navigation, route }) {
  const { item } = route.params ? route.params : { item: null }; // Vérification de route.params
  console.log({ item });

  return (
    <View style={styles.container}>
      <Text>Article SCREEN</Text>
      {item && ( // Afficher l'image si "item" est "true"
        <Image source={{ uri: item.url_image }} style={styles.imageDressing} />
      )}
      <Button
        title="Go To Dressing"
        onPress={() => navigation.navigate("DressingScreen")}
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
