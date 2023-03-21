import React, { Component } from "react";
import {View, Text, TouchableOpacity, StyleSheet } from "react-native";

//API
import { logoutUser } from "../api/api";

export default class ProfileScreen extends Component {

    async logout() {
        logoutUser()
            .then((response) => {
                this.props.navigation.navigate("Login")
            })
            .catch((error) => {
                this.props.navigation.navigate("Login")
                console.log(error);
            })
      }
      
    render() {
            return (
                <View>
                    <Text>Are you sure you want to log out?</Text>
                    <View style={styles.noBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileScreen")}>
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


const styles = StyleSheet.create({

});