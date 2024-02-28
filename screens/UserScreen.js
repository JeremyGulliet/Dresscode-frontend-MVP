import { Button, StyleSheet, Text, View } from 'react-native';

export default function UserScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>User SCREEN</Text>

            <Button title="Got DRESSING SCREEN"
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