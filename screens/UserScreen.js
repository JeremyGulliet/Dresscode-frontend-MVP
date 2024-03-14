import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTshirt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Importez votre image
import backgroundImage from '../assets/home/Dressing.jpg.webp';

export default function UserScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    // Fonction de déconnexion
    const handleLogout = () => {
        dispatch(logout());
        console.log("Utilisateur déconnecté");
        navigation.navigate('SignIn');
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerText, styles.whiteText]}>Mon Application</Text>
                {/* Logo cliquable pour la déconnexion */}
                <TouchableOpacity onPress={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} size={20} style={styles.logoutIcon} />
                </TouchableOpacity>
            </View>

            {/* Contenu */}
            <View style={styles.content}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Bienvenue, {user.username}!</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                {/* Bouton "Go to DRESSING SCREEN" avec l'icône de vêtement */}
                <TouchableOpacity onPress={() => navigation.navigate('DressingScreen')}>
                    <View style={styles.button}>
                        <FontAwesomeIcon icon={faTshirt} size={20} style={[styles.icon, styles.whiteText]} />
                        <Text style={[styles.buttonText, styles.buttonTextWhite, styles.boldText]}>{user.username}'s Dressing</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#0E0F62',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    whiteText: {
        color: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

    welcomeContainer: {
        alignItems: 'flex-start',
        marginLeft: 20,
        marginTop: 60,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#F0A73E',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
    },
    buttonTextWhite: {
        color: '#fff',
    },
    footer: {
        backgroundColor: '#0E0F62',
        paddingVertical: 10,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
    },
    icon: {
        marginRight: 10,
    },
    logoutIcon: {
        color: '#fff',
    },
});