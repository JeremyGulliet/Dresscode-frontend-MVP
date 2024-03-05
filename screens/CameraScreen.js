import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CameraScreen({ navigation }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(FlashMode.off);

    let cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
        console.log(photo);
    }

    if (!hasPermission || !isFocused) {
        return <View />;
    }


    return (
        <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
                    style={styles.button}
                >
                    <FontAwesome name='rotate-right' size={25} color='#ffffff' />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
                    style={styles.button}
                >
                    <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text>Camera SCREEN</Text>

                <Button title="Go To Add Article Screen"
                    onPress={() => navigation.navigate('AddArticleScreen')}
                />

                <Button title="Go To ValidateCamera"
                    onPress={() => navigation.navigate('ValidateCameraScreen')}
                />

            </View>

            <View style={styles.snapContainer}>
                <TouchableOpacity onPress={() => cameraRef && takePicture()}>
                    <FontAwesome name='circle-thin' size={95} color='#ffffff' />
                </TouchableOpacity>
            </View>
        </Camera>

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