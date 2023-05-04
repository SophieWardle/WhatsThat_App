/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Input, Icon, NativeBaseProvider } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import styles from '../styles/globalTheme';
// API
import { signupUser } from '../api/UserManagement';
// My components
import Logo from '../components/Logo';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      // submitted: false,
      error: '',
    };
  }

  validateInputs = () => {
    // eslint-disable-next-line global-require
    const validator = require('email-validator');
    const REGEX_PASS = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const {
      email,
      password,
      firstname,
      lastname,
      confirmPassword,
    } = this.state;

    if (!(email && password && firstname && lastname && confirmPassword)) {
      return 'Must fill in all fields';
    }

    if (!validator.validate(email)) {
      return 'Must enter valid email';
    }

    if (!REGEX_PASS.test(password)) {
      return "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long";
    }

    if (password !== confirmPassword) {
      return 'Passwords must match!';
    }

    return null;
  };

  onPressSignup = async () => {
    const {
      firstname,
      lastname,
      email,
      password,
    } = this.state;
    const navigation = this.props;
    const error = this.validateInputs();
    if (error) {
      this.setState({ error });
      return;
    }

    // this.setState({ submitted: true });

    // SEND TO SERVER
    const toSend = {
      first_name: firstname,
      last_name: lastname,
      email,
      password,
      show: false,
    };

    signupUser(toSend)
      .then(() => {
        this.setState({ error: 'User added successfully' });
        // this.setState({ submitted: false });
        navigation.navigation.navigate('Login');
      })
      .catch((err) => {
        this.setState({ error: err });
        // this.setState({ submitted: false });
      });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      error,
    } = this.state;
    const navigation = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
        <View style={styles.signupContainer}>
          <Logo />
          <Text style={styles.formHeader}>First name:</Text>
           <Input
              placeholder='Enter first name'
              style={{ width: '100%'}}
              value={firstname}
              onChangeText={(newFirstname) => this.setState({ firstname: newFirstname })}
              InputLeftElement={
                <Icon as={<MaterialIcons name='person' />} size='lg' ml={2} color="muted.400" />
              }
            />
          <Text style={styles.formHeader}>Last name:</Text>
          <Input
              placeholder='Enter last name'
              style={{ width: '100%'}}
              value={lastname}
              onChangeText={(newLastname) => this.setState({ lastname: newLastname })}
              InputLeftElement={
                <Icon as={<MaterialIcons name='person' />} size='lg' ml={2} color="muted.400" />
              }
            />
          <Text style={styles.formHeader}>Email:</Text>
          <Input
              placeholder='Enter Email'
              style={{ width: '100%'}}
              value={email}
              onChangeText={(newEmail) => this.setState({ email: newEmail })}
              InputLeftElement={
                <Icon as={<MaterialIcons name='email' />} size='lg' ml={2} color="muted.400" />
              }
            />
          <Text style={styles.formHeader}>Password:</Text>
          <Input
              placeholder='Enter Password'
              style={{ width: '100%'}}
              value={password}
              onChangeText={(newPassword) => this.setState({ password: newPassword })}
              type={this.state.show ? 'text' : 'password'}
              InputRightElement={
                <TouchableOpacity onPress={() => this.setState({ show: !this.state.show })}>
                  <Icon as={<MaterialIcons name={this.state.show ? 'visibility' : 'visibility-off'} />} size="lg" mr={2} color="muted.400" />
                </TouchableOpacity>
              }
            />
          <Text style={styles.formHeader}>Confirm Password:</Text>
          <Input
              placeholder='Confirm Password'
              style={{ width: '100%'}}
              value={confirmPassword}
              onChangeText={(newConfirmPassword) => this.setState({ confirmPassword: newConfirmPassword })}
              type={this.state.show ? 'text' : 'confirmPassword'}
              InputRightElement={
                <TouchableOpacity onPress={() => this.setState({ show: !this.state.show })}>
                  <Icon as={<MaterialIcons name={this.state.show ? 'visibility' : 'visibility-off'} />} size="lg" mr={2} color="muted.400" />
                </TouchableOpacity>
              }
            />
          <Text style={styles.errorMessage}>{error}</Text>
          <View style={styles.signupBtn}>
            <TouchableOpacity onPress={this.onPressSignup}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.backBtn}>
            <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </NativeBaseProvider>
      

    );
  }
}

export default SignUpScreen;
