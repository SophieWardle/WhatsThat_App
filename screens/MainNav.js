/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';

// Main Nav
import ContactsScreen from './contacts/ContactsScreen';
import ChatsScreen from './chats/ChatsScreen';
import ProfileScreen from './user/ProfileScreen';

// Contacts Nav
import ContactsProfileScreen from './contacts/ContactsProfileScreen';
import ContactsDeleteScreen from './contacts/ContactsDeleteScreen';
import ContactsSearch from './contacts/ContactsSearch';
import ContactsBlockScreen from './contacts/ContactsBlockScreen';
import ContactsBlockedScreen from './contacts/ContactsBlockedScreen';
import ContactsUnblockScreen from './contacts/ContactsUnblockScreen';

// Profile Nav
import ProfileUpdateScreen from './user/ProfileUpdateScreen';
import PassUpdateScreen from './user/PassUpdateScreen';
import ProfileLogoutScreen from './user/ProfileLogoutScreen';
import CameraApp from '../Camera';

// Chats nav
import ChatsNewScreen from './chats/ChatsNewScreen';
import ChatDisplayScreen from './chats/ChatDisplayScreen';
import MessageDelete from './chats/MessageDelete';
import MessageUpdate from './chats/MessageUpdate';
import ChatDetailsScreen from './chats/ChatDetailsScreen';
import ChatDeleteMember from './chats/ChatDeleteMember';
import ChatAddMember from './chats/ChatAddMember';
import ChatDetailsUpdateScreen from './chats/ChatDetailsUpdateScreen';

// Drafts
import DraftMessagesScreen from './drafts/DraftMessagesScreen';
import DraftsScreen from './drafts/DraftsScreen';
import DraftsDisplayScreen from './drafts/DraftsDisplayScreen';
import DraftsEditScreen from './drafts/DraftsEditScreen';
import DraftSchedulingScreen from './drafts/DraftScheduling';

const Tab = createMaterialTopTabNavigator();
const ContactStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Contacts':
      iconName = 'contacts';
      break;
    case 'Chats':
      iconName = 'message1';
      break;
    case 'Profile':
      iconName = 'profile';
      break;
    default:
      break;
  }

  return <AntDesign name={iconName} color={color} size={24} />;
};

function ContactStackNavigator() {
  return (
    <ContactStack.Navigator
      initialRouteName="Contacts"
      screenOptions={{ headerShown: false }}
    >

      <ContactStack.Screen name="ContactsScreen" component={ContactsScreen} />
      <ContactStack.Screen name="ContactProfile" component={ContactsProfileScreen} />
      <ContactStack.Screen name="Delete" component={ContactsDeleteScreen} />
      <ContactStack.Screen name="Search" component={ContactsSearch} />
      <ContactStack.Screen name="Block" component={ContactsBlockScreen} />
      <ContactStack.Screen name="BlockedContacts" component={ContactsBlockedScreen} />
      <ContactStack.Screen name="Unblock" component={ContactsUnblockScreen} />

    </ContactStack.Navigator>
  );
}

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator
      initialRouteName="Chats"
      screenOptions={{ headerShown: false }}
    >
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
      <ChatStack.Screen name="DraftScheduling" component={DraftSchedulingScreen} />

    </ChatStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="ProfileLogoutScreen" component={ProfileLogoutScreen} />
      <ProfileStack.Screen name="PassUpdateScreen" component={PassUpdateScreen} />
      <ProfileStack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
      <ProfileStack.Screen name="Camera" component={CameraApp} />

    </ProfileStack.Navigator>
  );
}

export default class MainNav extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const navigation = this.props;
    const value = await AsyncStorage.getItem('whatsthat_session_token');
    if (value == null) {
      navigation.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarLabel: () => null,
        })}
        tabBarOptions={{
          activeTintColor: '#000',
          inactiveTintColor: '#666',
          style: {
            backgroundColor: '#fff',
          },
          labelStyle: {
            fontSize: 12,
          },
          tabStyle: {
            borderTopWidth: 1,
            borderTopColor: '#ccc',
          },
          indicatorStyle: {
            backgroundColor: '#000',
          },
        }}
      >
        <Tab.Screen name="Contacts" component={ContactStackNavigator} />
        <Tab.Screen name="Chats" component={ChatStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    );
  }
}
