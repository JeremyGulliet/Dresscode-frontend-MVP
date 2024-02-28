import { Button, StyleSheet, Text, View } from 'react-native';

export default function DressingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Dressing SCREEN</Text>

            <Button title="Got To User Screen"
                onPress={() => navigation.navigate('UserScreen')}
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