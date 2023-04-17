import React, { Component } from "react";
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
//my components
import DisplayProfilePicture from "../components/DisplayProfilePicture";
//API
import { getUserProfileData } from "../api/UserManagement";
import { getUserProfilePic } from "../api/api";
//STYLES
import styles from '../styles/globalTheme';

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
            console.log("Get Profile Pic Success!" + this.state.photo);
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera', { navigation: this.props.navigation })}>
                        <View style={styles.profileButton}>
                            <Text style={styles.buttonText}>Edit Profile Picture</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileUpdateScreen')}>
                        <View style={styles.profileButton}>
                            <Text style={styles.buttonText}>Edit My Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileLogoutScreen")}>
                        <View style={styles.profileButton}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

