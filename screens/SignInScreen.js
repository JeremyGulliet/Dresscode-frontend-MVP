import { Button, StyleSheet, Text, View } from 'react-native';

export default function SignInScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>SIGNIN SCREEN</Text>
            <Button title="Connexion"
                onPress={() => navigation.navigate('TabNavigator')}
            />
            <Button title="Inscription"
                onPress={() => navigation.navigate('SignUp')}
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