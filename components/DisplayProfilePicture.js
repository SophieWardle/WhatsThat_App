import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

//API
import { getProfilePic } from "../api/api";

export default class DisplayProfilePicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            photo: null
        };
    }

    componentDidMount() {
        getProfilePic()
            .then((url) => {
                this.setState({
                    photo: url,
                    isLoading: false
                })
                console.log(this.state.url);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <View style={styles.pictureContainer}>

                    <Image
                        source={{
                            uri: this.state.photo,
                        }}
                        style={styles.profilePic}
                    />
                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profilePic: {
        width: 500,
        height: 500
    }
});