import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import DisplayProfilePicture from "../components/DisplayProfilePicture";
//API
import { getUserProfileData } from "../api/api";
import { getUserProfilePic } from "../api/api";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            profileData: [],
            photo: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            getUserProfileData()
            .then((responseJson) => {
                this.setState({
                    profileData: responseJson
                })
                this.getProfilePic()
            })
            .catch((error) => {
                console.log(error);
            });
        })

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getProfilePic = async () => {
        try {
            const photoBlob = await getUserProfilePic();
            this.setState({
                photo: photoBlob,
                isLoading: false
            });
            console.log("Get Profile Pic Success!"+ this.state.photo);
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        } else {
            const { first_name, last_name, email } = this.state.profileData;
            return (
                <View style={styles.profileContainer}>
                    <View style={styles.profileInformation}>
                        <DisplayProfilePicture photo={this.state.photo} />
                        <Text style={styles.name}>{first_name} {last_name}</Text>
                        <Text style={styles.email}>{email}</Text>
                    </View>
                    <View style={styles.editBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePictureUpdateScreen')}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Edit Profile Picture</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.editBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUpdateScreen')}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Edit My Profile</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoutBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileLogoutScreen")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        margin:5,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
       
    },
    profileInformation: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        textAlign: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    editBtn: {
        marginHorizontal: 10,
        marginVertical: 20,
    },
    logoutBtn: {
        marginHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#428bca',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});