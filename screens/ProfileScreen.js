import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

/*
LOGOUT BUTTON
<View style={styles.logoutBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Logout")}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


*/
export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            profileData: [],
            logoutSelect: false
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

    async logout() {
        console.log("Logout selected")
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: 'POST',
            headers: {
                'X-Authorization': token
            }
        })
            .then(async (response) => {
                if (response.status === 200) {
                    await AsyncStorage.removeItem('whatsthat_session_token')
                    await AsyncStorage.removeItem('id')
                    this.props.navigation.navigate("Login")
                } else if (response.status === 401) {
                    console.log("Unauthorised")
                    await AsyncStorage.removeItem('whatsthat_session_token')
                    await AsyncStorage.removeItem('id')
                    this.props.navigation.navigate("Login")
                } else {
                    throw "Something went wrong"
                }
            })
            .catch((error) => {
                console.log(error);
            })
      }
      

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        } else if (!this.state.logoutSelect) {
            const { first_name, last_name, email } = this.state.profileData;
            return (
                <ScrollView>
                    <View>
                        <Text>{first_name} {last_name}</Text>
                        <Text>{email}</Text>
                    </View>
                    <View style={styles.logoutBtn}>
                        <TouchableOpacity onPress={() => this.setState({ logoutSelect: true })}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            );
        } else {
            return (
                <View>
                    <Text>Are you sure you want to log out?</Text>
                    <View style={styles.noBtn}>
                        <TouchableOpacity onPress={() => this.setState({ logoutSelect: false })}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>NO</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.yesBtn}>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>YES</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            );

        }
    }
}

const styles = StyleSheet.create({

});