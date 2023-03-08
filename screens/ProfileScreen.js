import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";


export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            profileData: []
        };
    }

    componentDidMount() {
        this.getData();
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
            const { first_name, last_name, email } = this.state.profileData;
            return (
                <ScrollView>
                    <View>
                        <Text>{first_name} {last_name}</Text>
                        <Text>{email}</Text>
                    </View>
                    <View style={styles.logoutBtn}>
                        <TouchableOpacity onPress={this._onPressLogout}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Logout</Text>
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