import { Button, StyleSheet, Text, View } from 'react-native';

export default function AddArticleScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Add Article SCREEN</Text>

            <Button title="Got To Camera"
                onPress={() => navigation.navigate('CameraScreen')}
            />

            <Button title="Got To Import"
                onPress={() => navigation.navigate('ImportScreen')}
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