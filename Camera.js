import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, PermissionsAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraType, onCameraReady, CameraPictureOptions } from 'expo-camera';
import { sendPicToServer } from './api/api';
export default function CameraApp({ navigation }) {
    const [type, setType] = useState(CameraType.back);
    const [permission, setPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getCameraPermission() {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'App needs access to your camera',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Camera permission granted');
                        setPermission({ granted: true });
                    } else {
                        console.log('Camera permission denied');
                        setPermission({ granted: false });
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else {
                setPermission({ granted: true });
            }
        }
        getCameraPermission();
    }, []);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        console.log("Camera: ", type)
    }

    async function takePhoto() {
        if (camera) {
            const options = { quality: 0.5, base64: true, onPictureSaved: (data) => sendToServer(data) }
            const data = await camera.takePictureAsync(options)
            sendToServer(data);
        }
    }

    async function sendToServer(data) {
        console.log("HERE", data.uri)

        sendPicToServer(data)
            .then((rJson) => {
                console.log(rJson)
                setError({ "error": "Picture Saved Successfully" })
                navigation.navigate("ProfileScreen")
            })
            .catch((error) => {
                setError({ "error": error })
            })

        
    }



    if (!permission || !permission.granted) {
        return (<Text>No access to camera</Text>)
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.text}>Back</Text>
                    </TouchableOpacity>
                </View>
                <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <Text style={styles.text}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5,
        backgroundColor: 'steelblue'
    },
    button: {
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ddd'
    }
})



/*
let res = await fetch(data.base64);
    let blob = await res.blob;
*/