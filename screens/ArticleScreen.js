import { Button, StyleSheet, Text, View } from 'react-native';

export default function ArticleScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Article SCREEN</Text>

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