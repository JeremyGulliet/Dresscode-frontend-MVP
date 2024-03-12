import { Button, StyleSheet, Text, View, Image } from "react-native";

export default function ArticleScreen({ navigation, route }) {
  const { url } = route.params;
  console.log({ url });

  return (
    <View style={styles.container}>
      <Text>Article SCREEN</Text>
      <Image source={{ uri: url }} style={styles.imageDressing} />
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
