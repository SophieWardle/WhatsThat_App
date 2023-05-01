/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// My Styles
import styles from '../styles/globalTheme';
// My Components
import Logo from '../components/Logo';
// API
import { loginUser } from '../api/UserManagement';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

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
    if (value != null) {
      navigation.navigation.navigate('MainNav');
    }
  };

  validateInputs = () => {
    // eslint-disable-next-line global-require
    const validator = require('email-validator');
    const { email, password } = this.state;
    const REGEX_PASS = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!(email && password)) {
      return 'Email and password required';
    }

    if (!validator.validate(email)) {
      return 'Must enter valid email';
    }

    if (!REGEX_PASS.test(password)) {
      return "Password incorrect: isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long";
    }

    return null;
  };

  onPressButton = () => {
    const { email, password } = this.state;
    const navigation = this.props;
    const error = this.validateInputs();
    if (error) {
      this.setState({ error });
      return;
    }

    // SEND TO SERVER
    const toSend = {
      email,
      password,
    };

    loginUser(toSend)
      .then(() => {
        navigation.navigation.reset({
          index: 0,
          routes: [{ name: 'MainNav' }],
        });
        this.setState({ error: '' });
        navigation.navigation.navigate('MainNav');
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err });
      });
  };

  render() {
    const { email, password, error } = this.state;
    const navigation = this.props;
    return (
      <View style={styles.backgroundContainer}>

        <View style={styles.loginContainer}>
          <Logo />
          <Text style={styles.formHeader}>Email:</Text>
          <TextInput
            style={styles.formInput}
            value={email}
            onChangeText={(newEmail) => this.setState({ email: newEmail })}
          />
          <Text style={styles.formHeader}>Password:</Text>
          <TextInput
            style={styles.formInput}
            secureTextEntry
            value={password}
            onChangeText={(newPassword) => this.setState({ password: newPassword })}
          />
          <Text style={styles.errorMessage}>{error}</Text>
          <View style={styles.loginBtn}>
            <TouchableOpacity onPress={this.onPressButton}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.signupBtn}>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('SignUp')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Need an account? Click here</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

export default LoginScreen;
