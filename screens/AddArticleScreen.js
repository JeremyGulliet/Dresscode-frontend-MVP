import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddArticleScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dressing vide</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.cameraContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CameraScreen')} style={styles.buttonContent}
                    ><FontAwesome name='camera-retro' size={70} color='#000000' style={styles.icon} />
                        <Text style={styles.text}>Appareil Photo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.importContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ImportScreen')} style={styles.buttonContent}
                    ><FontAwesome name='upload' size={70} color='#000000' style={styles.icon} />
                        <Text style={styles.text}>Importer</Text></TouchableOpacity>
                </View>
            </View>

      <FooterCompo />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 30,
        marginTop: 300,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50,
    },

    cameraContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,


    },

    importContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,


    },

    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        marginLeft: 60,
        fontSize: 20,
    },

    icon: {
        marginRight: 10
    }
});
