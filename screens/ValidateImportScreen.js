import { Button, StyleSheet, Text, View } from 'react-native';

export default function ValidateImportScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Validate Import SCREEN</Text>

            <Button title="Got To Import"
                onPress={() => navigation.navigate('ImportScreen')}
            />

            <Button title="Got To Dressing"
                onPress={() => navigation.navigate('DressingScreen')}
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