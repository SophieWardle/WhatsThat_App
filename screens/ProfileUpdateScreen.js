import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

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

    async updateProfile() {
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
            method: 'GET',
            headers: {
                'X-Authorization': token
            }
        })
            .then((response) => response.json())
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
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        const url = `http://localhost:3333/api/1.0.0/user/${id}`
        console.log(token);
        return fetch(url, {
            method: 'GET',
            headers: {
                'X-Authorization': token
            }
        })
            .then((response) => response.json())
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
            console.log(this.state.profileData);
            const { first_name, last_name, email} = this.state.profileData;
            return (
                <ScrollView>
                    <View>
                        <TextInput
                            placeholder={first_name}
                            value={first_name}
                            onChangeText={(text) => this.setState({ first_name: text })}
                        />
                        <TextInput
                            placeholder={last_name}
                            value={last_name}
                            onChangeText={(text) => this.setState({ last_name: text })}
                        />
                        <TextInput
                            placeholder={email}
                            value={email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <TouchableOpacity onPress={() => this.updateProfile()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Save</Text>
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

