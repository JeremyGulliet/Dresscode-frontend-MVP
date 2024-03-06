import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderCompo from "../components/headerCompo.js";

export default function AddArticleScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.notifBar}>
        <View style={styles.headerContainer}>
          <HeaderCompo />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Dressing vide</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CameraScreen")}
                style={styles.buttonContent}
              >
                <FontAwesome
                  name="camera-retro"
                  size={70}
                  color="#000000"
                  style={styles.icon}
                />
                <Text style={styles.text}>Appareil Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.importContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ImportScreen")}
                style={styles.buttonContent}
              >
                <FontAwesome
                  name="upload"
                  size={70}
                  color="#000000"
                  style={styles.icon}
                />
                <Text style={styles.text}>Importer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  notifBar: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#0E0E66",
    // marginTop: 40,
  },

  headerContainer: {
    flex: 1,
    marginTop: 40,
  },

  contentContainer: {
    flex: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  container: {
    display: "flex",
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  title: {
    fontSize: 30,
    // marginTop: 300,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },

  cameraContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },

  importContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    marginLeft: 60,
    fontSize: 20,
  },

  icon: {
    marginRight: 10,
  },
});
