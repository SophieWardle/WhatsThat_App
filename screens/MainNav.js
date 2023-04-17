import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Main Nav
import ContactsScreen from "./ContactsScreen";
import ChatsScreen from "./ChatsScreen";
import ProfileScreen from "./ProfileScreen";
import Logout from "./ProfileLogoutScreen";

//Contacts Nav
import ContactsProfileScreen from "./ContactsProfileScreen";
import ContactsDeleteScreen from "./ContactsDeleteScreen";
import ContactsSearch from "./ContactsSearch";
import ContactsBlockScreen from "./ContactsBlockScreen";
import ContactsBlockedScreen from "./ContactsBlockedScreen";
import ContactsUnblockScreen from "./ContactsUnblockScreen";

//Profile Nav
import ProfileUpdateScreen from "./ProfileUpdateScreen";
import ProfileLogoutScreen from "./ProfileLogoutScreen";
import CameraApp from "../Camera";

//Chats nav
import ChatsNewScreen from "./ChatsNewScreen";
import ChatDisplayScreen from "./ChatDisplayScreen";
import MessageDelete from "./MessageDelete";
import MessageUpdate from "./MessageUpdate";
import ChatDetailsScreen from "./ChatDetailsScreen";
import ChatDeleteMember from "./ChatDeleteMember";
import ChatAddMember from "./ChatAddMember";
import ChatDetailsUpdateScreen from "./ChatDetailsUpdateScreen";
import DraftMessagesScreen from "../DraftMessagesScreen";
import DraftsScreen from "../DraftsScreen"
import DraftsDisplayScreen from "../DraftsDisplayScreen";
import DraftsEditScreen from "../DraftsEditScreen";

const Tab = createMaterialTopTabNavigator();
const ContactStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

function ContactStackNavigator() {
    return (
        <ContactStack.Navigator
            initialRouteName="Contacts"
            screenOptions={{ headerShown: false }}>
                
            <ContactStack.Screen name="ContactsScreen" component={ContactsScreen} />
            <ContactStack.Screen name="ContactProfile" component={ContactsProfileScreen} />
            <ContactStack.Screen name="Delete" component={ContactsDeleteScreen} />
            <ContactStack.Screen name="Search" component={ContactsSearch} />
            <ContactStack.Screen name="Block" component={ContactsBlockScreen} />
            <ContactStack.Screen name="BlockedContacts" component={ContactsBlockedScreen} />
            <ContactStack.Screen name="Unblock" component={ContactsUnblockScreen} />


        </ContactStack.Navigator>
    )
}

function ChatStackNavigator() {
    return (
        <ChatStack.Navigator
            initialRouteName="Chats"
            screenOptions={{ headerShown: false }}>
            <ChatStack.Screen name="ChatsScreen" component={ChatsScreen} />
            <ChatStack.Screen name="NewChat" component={ChatsNewScreen} />
            <ChatStack.Screen name="Chat" component={ChatDisplayScreen} />
            <ChatStack.Screen name="DeleteMessage" component={MessageDelete} />
            <ChatStack.Screen name="EditMessage" component={MessageUpdate} />
            <ChatStack.Screen name="ChatDetails" component={ChatDetailsScreen} />
            <ChatStack.Screen name="EditChat" component={ChatDetailsUpdateScreen} />
            <ChatStack.Screen name="DeleteMember" component={ChatDeleteMember} />
            <ChatStack.Screen name="AddMember" component={ChatAddMember} />
            <ChatStack.Screen name="DraftMessages" component={DraftMessagesScreen} />
            <ChatStack.Screen name="Drafts" component={DraftsScreen} />
            <ChatStack.Screen name="DraftsDisplay" component={DraftsDisplayScreen} />
            <ChatStack.Screen name="DraftsEdit" component={DraftsEditScreen} />

        </ChatStack.Navigator>
    )
}

function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator
            initialRouteName="Profile"
            screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
            <ProfileStack.Screen name="ProfileLogoutScreen" component={ProfileLogoutScreen} />
            <ProfileStack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
            <ProfileStack.Screen name="Camera" component={CameraApp} />

        </ProfileStack.Navigator>
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
                <Tab.Navigator
                    initialRouteName="Chats"
                    screenOptions={{
                        tabBarOptions: {
                            style: { backgroundColor: 'red' },
                            activeTintColor: 'white', // Set the text color of the active tab
                            inactiveTintColor: 'gray'
                        },
                    }}>
                    <Tab.Screen name="Contacts" component={ContactStackNavigator} />
                    <Tab.Screen name="Chats" component={ChatStackNavigator} />
                    <Tab.Screen name="Profile" component={ProfileStackNavigator} />
                </Tab.Navigator>
        )
    }
}