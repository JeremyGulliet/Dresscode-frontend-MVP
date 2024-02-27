import { Button, StyleSheet, Text, View } from 'react-native';

export default function DressingScreen() {
    return (
        <View style={styles.container}>
            <Text>Dressing SCREEN</Text>

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