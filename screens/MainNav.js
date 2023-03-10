import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Main Nav
import ContactsScreen from "./ContactsScreen";
import ChatsScreen from "./ChatsScreen";
import ProfileScreen from "./ProfileScreen";
import Logout from "./Logout";

//Contacts Nav
import ContactsDelete from "./ContactsDelete";
import ContactsSearch from "./ContactsSearch";


const Tab = createMaterialTopTabNavigator();
const ContactStack = createNativeStackNavigator();

function  ContactStackNavigator() {
    return (
        <ContactStack.Navigator
            initialRouteName="Contacts"
            screenOptions={{ headerShown: false}}>
            <ContactStack.Screen name="ContactsScreen" component={ContactsScreen} />
            <ContactStack.Screen name="Delete" component={ContactsDelete} />
            <ContactStack.Screen name="Search" component={ContactsSearch} />

        </ContactStack.Navigator>
    )
}
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
                <Tab.Screen name="Contacts" component={ContactStackNavigator} />
                <Tab.Screen name="Chats" component={ChatsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />

            </Tab.Navigator>
        )
    }
}