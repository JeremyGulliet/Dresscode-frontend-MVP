import { Button, StyleSheet, Text, View } from 'react-native';

export default function DressingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Dressing SCREEN</Text>

            <Button title="Go To User Screen"
                onPress={() => navigation.navigate('UserScreen')}
            />

            <Button title="Go To Search Screen"
                onPress={() => navigation.navigate('SearchScreen')}
            />

            <Button title="Go to home"
                onPress={() => navigation.navigate('Home')}
            />

            <Button title="Got To Add Article Screen"
                onPress={() => navigation.navigate('AddArticleScreen')}
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