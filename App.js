/* eslint-disable linebreak-style */
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainNav from './screens/MainNav';

const AuthStack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          initialRouteName: 'Login',
        }}
      >
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="MainNav" component={MainNav} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
