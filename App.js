import React, {Component} from 'react';
import {  StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ContactsScreen from './ContactsScreen';

const AuthStack = createNativeStackNavigator();

class App extends Component {
  render(){
    return(
      <NavigationContainer>
        <AuthStack.Navigator
        screenOptions={{
          headerShown:false,
          initialRouteName: "Login"
        }}
        >
        <AuthStack.Screen name="Login" component={LoginScreen}/>
        <AuthStack.Screen name="SignUp" component={SignUpScreen}/>
        

        </AuthStack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;