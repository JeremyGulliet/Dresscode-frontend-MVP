import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";

export default function TemplateHeaderFooterScreen() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <HeaderCompo />
      </View>

      <View style={styles.contentContainer}>
        <Text>CONTENT</Text>
      </View>

      <FooterCompo navigation={navigation} />
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
    flex: 1,
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
  footerContainer: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
  },
});
