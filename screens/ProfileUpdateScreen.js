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
            profileData: [],
        };
    }

    componentDidMount() {
        this.getData();
    }

    handleInputChange = (field, value) => {
        this.setState({ [field]: value});
    }
    async updateProfile() {
        let to_send = {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
        };
        
        updateUserProfile(to_send)
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    contactData: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async getData() {
       getUserProfileData()
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    profileData: responseJson
                })
                console.log(this.state.profileData);
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
            const { firstname, lastname, email } = this.state.profileData;
            return (
                <ScrollView>
                    <View>
                        <TextInput
                            placeholder={firstname}
                            value={this.state.firstname}
                            onChangeText={(text) => this.handleInputChange('firstname', text)}
                        />
                        <TextInput
                            placeholder={lastname}
                            value={this.state.lastname}
                            onChangeText={(text) => this.handleInputChange('lastname', text)}
                        />
                        <TextInput
                            placeholder={email}
                            value={this.state.email}
                            onChangeText={(text) => this.handleInputChange('email', text)}
                        />
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
}

const styles = StyleSheet.create({

});

