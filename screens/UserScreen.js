import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';


export default function UserScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    // Redirection pour SignIn si pas connecté
    const handleLogout = () => {
        dispatch(logout());
        console.log("utilisateur deconnecté")
        navigation.navigate('SignIn');
    };


    return (
        <View style={styles.container}>
            <Text>User SCREEN</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DressingScreen')}>
                <Text style={styles.button}>Go to DRESSING SCREEN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={[styles.button, styles.logout]}>Logout</Text>
            </TouchableOpacity>
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

    button: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        textAlign: 'center',
    },
    logout: {
        backgroundColor: 'red',
    },
});