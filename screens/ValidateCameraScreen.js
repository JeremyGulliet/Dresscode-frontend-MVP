import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ValidateCameraScreen({ navigation, route }) {
    const { url } = route.params;
    const user = useSelector((state) => state.user.value);

    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [colors, setColors] = useState('');
    const [size, setSize] = useState('');
    const [weatherType, setWeatherType] = useState('');
    const [tempMin, setTempMin] = useState(0);
    const [tempMax, setTempMax] = useState(0);
    const [event, setEvent] = useState('');
    const [brand, setbrand] = useState('');
    const [favorite, setFavorite] = useState(false);


    const handleSubmit = () => {
        fetch('http://192.168.1.41:3000/weathers', {
            // requête POST pour créer une entrée dans la collection "weathers"
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                weather: weatherType,
                temp_min: tempMin,
                temp_max: tempMax,
            })
        })
            .then(response => response.json())
            .then(weatherData => {
                //requête POST pour créer une entrée dans la collection "descriptions"
                fetch('http://192.168.1.41:3000/descriptions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: type,
                        category: category,
                        size: size,
                        color: colors,
                        event: event,
                    })
                })
                    .then(response => response.json())
                    .then(descriptionData => {
                        //requête POST pour créer une entrée dans la collection "brands"
                        fetch('http://192.168.1.41:3000/brands', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: brand,
                            })
                        })
                            .then(response => response.json())
                            .then(brandData => {
                                //requêtePOST pour créer le nouvel article dans la collection "articles"
                                fetch('http://192.168.1.41:3000/articles', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        weather: weatherData,
                                        useDate: new Date(),
                                        favorite: favorite,
                                        url_image: url,
                                        description: descriptionData,
                                        brand: brandData,
                                    })
                                })
                                    .then(data => {
                                        console.log(data);
                                        navigation.navigate("DressingScreen");
                                    })
                                    .catch(error => {
                                        // Gérer les erreurs de requête
                                        console.error("Erreur lors de l'envoi de l'article:", error);
                                    });
                            })
                            .catch(error => {
                                // Gérer les erreurs de requête pour la création de la marque
                                console.error("Erreur lors de la création de la marque:", error);
                            });
                    })
                    .catch(error => {
                        // Gérer les erreurs de requête pour la création de la description
                        console.error("Erreur lors de la création de la description:", error);
                    });
            })
            .catch(error => {
                // Gérer les erreurs de requête pour la création de la météo
                console.error("Erreur lors de la création de la météo:", error);
            });
    };



    return (
        <View style={styles.mainContainer}>
            <View style={styles.notifBar}>
                <View style={styles.headerContainer}>
                    <HeaderCompo />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: url }} style={styles.image} />
                </View>

                <View style={styles.descriptionContainer}>
                    <Button title="Go To Camera"
                        onPress={() => navigation.navigate('CameraScreen')}
                    />

                    <Button title="Go To Dressing"
                        onPress={() => handleSubmit()}
                    />


                </View>

            </View>

            <FooterCompo navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    notifBar: {
        flex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#0E0E66",
        // marginTop: 40,
    },

    headerContainer: {
        flex: 1,
        marginTop: 40,
    },

    contentContainer: {
        flex: 12,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        width: "100%",
    },


    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        height: '80%',

    },

    descriptionContainer: {
        flex: 4,
        borderTopWidth: 2,
        width: "100%"
    },

    image: {
        width: '80%',
        height: '80%',
        borderRadius: 10,


    }

});
