import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

//API
import { getUserProfileData } from "../api/api";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            profileData: [],
        };
    }

    componentDidMount() {
        getUserProfileData()
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
                <ScrollView style={styles.profileContainer}>
                    <View>
                        <Text style={styles.name}>{first_name} {last_name}</Text>
                        <Text style={styles.email}>{email}</Text>
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
                </ScrollView>

            );
        } 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      profileInfo: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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