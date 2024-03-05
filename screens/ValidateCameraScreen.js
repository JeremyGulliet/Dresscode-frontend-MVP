import { Button, StyleSheet, Text, View } from 'react-native';
import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ValidateCameraScreen({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.notifBar}>
                <View style={styles.headerContainer}>
                    <HeaderCompo />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Text>IMAGE</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Button title="Go To Camera"
                        onPress={() => navigation.navigate('CameraScreen')}
                    />

                    <Button title="Go To Dressing"
                        onPress={() => navigation.navigate('DressingScreen')}
                    />
                </View>

            </View>


            <View style={styles.backContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('AddArticleScreen')}>
                    <FontAwesome name='arrow-circle-left' size={50} color='#ffffff' />
                </TouchableOpacity>
            </View>

        </View>
    )
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
    },
    footerContainer: {
        flex: 1,
        backgroundColor: "green",
        width: "100%",
    },

    imageContainer: {
        flex: 2,
        backgroundColor: 'blue',
        width: "100%",
    },

    descriptionContainer: {
        flex: 5,
        backgroundColor: 'red',
        width: "100%"
    }

});