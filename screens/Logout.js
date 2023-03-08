import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            error: ""
        }
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
                    await AsyncStorage.removeItem(token)
                    await AsyncStorage.removeItem(id)
                    this.props.navigation.navigate("Login")
                } else if (response.status === 401) {
                    console.log("Unauthorised")
                    await AsyncStorage.removeItem(token)
                    await AsyncStorage.removeItem(id)
                    this.props.navigation.navigate("Login")
                } else {
                    throw "Something went wrong"
                }
            })
            .catch((error) => {
                this.setState({ "error": error })
            })
    }

    render() {
        return (
            <View>
                <Text>Are you sure you want to log out?</Text>
                <View style={styles.yesBtn}>
                    <TouchableOpacity onPress={this.logout()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>YES</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.noBtn}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NO</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

