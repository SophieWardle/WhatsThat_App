import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

import { updateUserProfile } from "../api/api";
import { getUserProfileData } from "../api/api";

export default class ProfileUpdateScreen extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoading: true,
            userData: [],
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: "",
        };
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            getUserProfileData()
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        userData: responseJson
                    });
                    this.populateForm();
                })
                .catch((error) => {
                    console.log(error);
                });
        })

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    firstNameHandler = (firstname) => {
        this.setState({ firstName: firstname });
        console.log("1st name handler called");
    };

    lastNameHandler = (lastname) => {
        this.setState({ lastName: lastname });
        console.log("last name handler called");
    };

    emailHandler = (email) => {
        this.setState({ email: email });
    };


    async updateProfile() {
        const to_send = {};

        if (this.state.firstName !== this.state.userData.first_name) {
            to_send.first_name = this.state.firstName;
        }

        if (this.state.lastName !== this.state.userData.last_name) {
            to_send.last_name = this.state.lastName;
        }

        if (this.state.email !== this.state.userData.email) {
            to_send.email = this.state.email;
        }


        console.log("Update Profile Function" + to_send.first_name + to_send.last_name + to_send.email);

        updateUserProfile(to_send)
            .then(() => {
                this.setState({
                    isLoading: false,
                    error: 'Profile updated!',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    populateForm() {
        const newFirstname = this.state.userData.first_name;
        const newLastname = this.state.userData.last_name;
        const newEmail = this.state.userData.email;
        this.setState({ firstName: newFirstname });
        this.setState({ lastName: newLastname });
        this.setState({ email: newEmail });
    }


    render() {
        return (
            <ScrollView>
                <View>
                    <TextInput
                        placeholder="First name..."
                        onChangeText={this.firstNameHandler}
                        value={this.state.firstName}
                    />
                    <TextInput
                        placeholder="Last name..."
                        onChangeText={this.lastNameHandler}
                        value={this.state.lastName}
                    />
                    <TextInput
                        placeholder="Email..."
                        onChangeText={this.emailHandler}
                        value={this.state.email}
                    />
                    <Text style={styles.errorMessage}>{this.state.error}</Text>
                    <TouchableOpacity onPress={() => this.updateProfile()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    formInput: {

    }
});

