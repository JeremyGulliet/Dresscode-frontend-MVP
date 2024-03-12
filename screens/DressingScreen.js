import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import HeaderCompo from "../components/headerCompo";
import { AntDesign } from "@expo/vector-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../constants/config";

export default function DressingScreen({ navigation }) {
  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);

  useEffect(() => {
    fetchTops();
    fetchBottoms();
  }, []);

  const fetchTops = () => {
    fetch(`${API_URL}/articles/dressing/hauts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Filtrer les éléments pour ne conserver que les hauts
        const hauts = data.filter(
          (item) => item.description && item.description.type === "haut"
        );
        console.log("Data for tops:", hauts);
        setTops(hauts); // Définir uniquement les hauts dans l'état
      })
      .catch((error) => console.error("Error fetching tops:", error));
  };

  const fetchBottoms = () => {
    fetch(`${API_URL}/articles/dressing/bas`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Filtrer les éléments pour ne conserver que les bas
        const bas = data.filter(
          (item) => item.description && item.description.type === "bas"
        );
        console.log("Data for bottoms:", bas);
        setBottoms(bas); // Définir uniquement les bas dans l'état
      })
      .catch((error) => console.error("Error fetching tops:", error));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <HeaderCompo />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* en tete */}

          {/* filter */}
          <View style={styles.filterContainer}>
            <Text>Filter</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <FontAwesome6 name="magnifying-glass" size={30} color="#0E0E66" />
            </TouchableOpacity>
          </View>

          {/* vetement haut */}
          <View style={styles.topContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tops.map((top, index) => (
                <Image
                  key={index}
                  source={{ uri: top.url_image }}
                  style={styles.imageDressing}
                />
              ))}
            </ScrollView>
          </View>

          {/* vetement bas */}
          <View style={styles.bottomContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {bottoms.map((bottom, index) => (
                <Image
                  key={index}
                  source={{ uri: bottom.url_image }}
                  style={styles.imageDressing}
                />
              ))}
            </ScrollView>
          </View>

          {/* section sélection */}
          <View style={styles.selectContainer}>
            <Text>Votre sélection</Text>

            <View style={styles.selectSubContainer}>
              <Image
                source={require("../assets/dressing/top-01.png")}
                style={styles.imageDressing}
              />
              <Image
                source={require("../assets/dressing/bottom-01.png")}
                style={styles.imageDressing}
              />
            </View>
          </View>

          {/* les boutons en bas de screen */}
          <View style={styles.buttonContainer}>
            {/* button 1 */}
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => console.log("Pressed => Sélectionner")}
            >
              <Text style={styles.buttonText}>Sélectionner</Text>
            </TouchableOpacity>

            {/* button 2 */}
            <TouchableOpacity
              onPress={() => console.log("Pressed => Central +")}
            >
              <AntDesign name="pluscircle" size={50} color="#0E0E66" />
            </TouchableOpacity>

            {/* button 3 */}
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => console.log("Pressed => Générer")}
            >
              <Text style={styles.buttonText}>Générer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    rowGap: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageDressing: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 8,
    height: "auto",
    padding: 20,
    alignItems: "center",
    gap: 10,
  },
  selectSubContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonLeft: {
    backgroundColor: "#FCA311",
    width: 130,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRight: {
    backgroundColor: "#FF4B8C",
    width: 130,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
