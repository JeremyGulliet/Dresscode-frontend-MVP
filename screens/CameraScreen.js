import { Button, StyleSheet, Text, View } from 'react-native';

export default function CameraScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Camera SCREEN</Text>

            <Button title="Got To Add Article Screen"
                onPress={() => navigation.navigate('AddArticleScreen')}
            />

            <Button title="Got To ValidateCamera"
                onPress={() => navigation.navigate('ValidateCameraScreen')}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});