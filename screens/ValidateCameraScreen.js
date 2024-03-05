import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import HeaderCompo from "../components/headerCompo.js";
import FooterCompo from "../components/footerCompo.js";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';

export default function ValidateCameraScreen({ navigation, route }) {
    const { url } = route.params;



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
                        onPress={() => navigation.navigate('DressingScreen')}
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