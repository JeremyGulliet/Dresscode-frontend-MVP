import { StyleSheet, Text, View } from "react-native";
import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";

export default function TemplateHeaderFooterScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.notifBar}>
        <View style={styles.headerContainer}>
          <HeaderCompo />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text>CONTENT</Text>
      </View>

      <FooterCompo />
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
    backgroundColor: "#0E0E6661",
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
  },
  footerContainer: {
    flex: 1,
    backgroundColor: "green",
    width: "100%",
  },
});
