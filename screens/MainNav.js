import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Screens
import ContactsScreen from "./ContactsScreen";
const Tab = createMaterialTopTabNavigator();

export default class MainNav extends Component {

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('whatsthat_session_token');
        if (value == null) {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <Tab.Navigator initialRouteName="Contacts">
                <Tab.Screen name="Contacts" component={ContactsScreen} />
            </Tab.Navigator>
        )
    }
}