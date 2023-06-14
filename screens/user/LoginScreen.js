/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
// My Styles
import styles from '../../styles/globalTheme';
// My Components
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import LoginForm from '../../components/LoginForm';
// API
import { loginUser } from '../../api/UserManagement';
import buttonStyles from '../../styles/buttons';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      show: false,
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
        this.setState((prevState) => ({
          email: '',
          password: '',
          error: '',
          show: !prevState.show,
        }));
        navigation.navigation.navigate('MainNav');
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err });
      });
  };

  render() {
    const {
      email,
      password,
      error,
      show,
    } = this.state;
    const { navigation } = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>

          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <LoginForm
            email={email}
            password={password}
            show={show}
            onEmailChange={(newEmail) => this.setState({ email: newEmail })}
            onPasswordChange={(newPassword) => this.setState({ password: newPassword })}
            onTogglePasswordVisibility={() => this.setState({ show: !show })}
            error={error}
          />
          <View style={styles.btnContainer}>
            <View style={styles.loginBtn}>
              <Button
                onPress={this.onPressButton}
                title="Login"
                buttonStyle={styles.button}
                textStyle={buttonStyles.buttonText}
              />
            </View>
            <View style={styles.signupBtn}>
              <Button
                onPress={() => navigation.navigate('SignUp')}
                title="Need an account? Click here"
                buttonStyle={styles.button}
                textStyle={buttonStyles.buttonText}
              />
            </View>
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}

export default LoginScreen;
