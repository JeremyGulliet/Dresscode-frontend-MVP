import { Button, StyleSheet, Text, View } from 'react-native';

export default function ImportScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Import SCREEN</Text>

            <Button title="Got To Add Article Screen"
                onPress={() => navigation.navigate('AddArticleScreen')}
            />

            <Button title="Got To Validate Import"
                onPress={() => navigation.navigate('ValidateImportScreen')}
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