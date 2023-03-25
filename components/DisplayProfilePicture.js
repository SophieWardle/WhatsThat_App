import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";


const DisplayProfilePicture = ({ photo }) => {
    return (
        <View style={styles.pictureContainer}>
            <Image
                source={{
                    uri: photo,
                }}
                style={styles.profilePic}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pictureContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
    }
});



export default DisplayProfilePicture;