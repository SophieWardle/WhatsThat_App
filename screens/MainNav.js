import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Screens
import ContactsScreen from "./ContactsScreen";
import ChatsScreen from "./ChatsScreen";
import ProfileScreen from "./ProfileScreen";
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
            <Tab.Navigator initialRouteName="Chats">
                <Tab.Screen name="Contacts" component={ContactsScreen} />
                <Tab.Screen name="Chats" component={ChatsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        )
    }
}