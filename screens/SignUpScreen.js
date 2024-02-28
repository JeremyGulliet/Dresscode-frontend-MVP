import { Button, StyleSheet, Text, View } from 'react-native';

export default function SignUpScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>SignUp SCREEN</Text>

            <Button title="Got To Add Article SCREEN"
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