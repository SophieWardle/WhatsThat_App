/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Text,
  View,
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
      error: '',
      showPass: false,
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
    } = this.state;

    if (!(email && password && firstname && lastname)) {
      return 'Must fill in all fields';
    }

    if (!validator.validate(email)) {
      return 'Must enter valid email';
    }

    if (!REGEX_PASS.test(password)) {
      return "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long";
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
      error,
      showPass,
    } = this.state;
    const navigation = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
          <View style={styles.signupContainer}>

            <View style={[styles.logoContainer, { alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }]}>
              <Logo />
            </View>

            <View style={[styles.formContainer, { flex: 3, paddingHorizontal: 20 }]}>
              <View style={styles.borderBackground}>
                <Text style={styles.formHeader}>First name:</Text>
                <Input
                  placeholder="Enter first name"
                  style={styles.formInput}
                  value={firstname}
                  onChangeText={(newFirstname) => this.setState({ firstname: newFirstname })}
                  InputLeftElement={(
                    <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
                      <Icon as={<MaterialIcons name="person" />} size="lg" ml={2} color="muted.400" />
                    </View>
                  )}
                />
                <Text style={styles.formHeader}>Last name:</Text>
                <Input
                  placeholder="Enter last name"
                  style={styles.formInput}
                  value={lastname}
                  onChangeText={(newLastname) => this.setState({ lastname: newLastname })}
                  InputLeftElement={(
                    <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
                      <Icon as={<MaterialIcons name="person" />} size="lg" ml={2} color="muted.400" />
                    </View>
                  )}
                />
                <Text style={styles.formHeader}>Email:</Text>
                <Input
                  placeholder="Enter Email"
                  style={styles.formInput}
                  value={email}
                  onChangeText={(newEmail) => this.setState({ email: newEmail })}
                  InputLeftElement={(
                    <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
                      <Icon as={<MaterialIcons name="email" />} size="lg" ml={2} color="muted.400" />
                    </View>
                  )}
                />
                <Text style={styles.formHeader}>Password:</Text>
                <Input
                  placeholder="Enter Password"
                  style={styles.formInput}
                  value={password}
                  onChangeText={(newPassword) => this.setState({ password: newPassword })}
                  type={showPass ? 'text' : 'password'}
                />
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
            <View style={[styles.btnContainer, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
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
        </View>
      </NativeBaseProvider>

    );
  }
}

export default SignUpScreen;
