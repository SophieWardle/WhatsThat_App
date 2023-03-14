import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        
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

                    </View>
                </ScrollView>
            );
        } 
    }
}

const styles = StyleSheet.create({

});