/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';

import styles from '../../styles/globalTheme';
import buttonStyles from '../../styles/buttons';
// API
import { signupUser } from '../../api/UserManagement';
// My components
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import SignupForm from '../../components/SignupForm';

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

    const toSend = {
      first_name: firstname,
      last_name: lastname,
      email,
      password,
    };

    signupUser(toSend)
      .then(() => {
        this.setState({ error: 'User added successfully' });
        navigation.navigation.navigate('Login');
      })
      .catch((err) => {
        this.setState({ error: err });
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

          <View style={[styles.logoContainer, { alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }]}>
            <Logo />
          </View>

          <SignupForm
            firstname={firstname}
            lastname={lastname}
            email={email}
            password={password}
            show={showPass}
            onNameChange={(newFirstname) => this.setState({ firstname: newFirstname })}
            onSurnameChange={(newLastname) => this.setState({ lastname: newLastname })}
            onEmailChange={(newEmail) => this.setState({ email: newEmail })}
            onPasswordChange={(newPassword) => this.setState({ password: newPassword })}
            error={error}
          />
          <View style={[styles.btnContainer, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <View style={styles.signupBtn}>
              <Button
                onPress={this.onPressSignup}
                title="Signup"
                buttonStyle={styles.button}
                textStyle={buttonStyles.buttonText}
              />
            </View>
            <View style={styles.backBtn}>
              <Button
                onPress={() => navigation.navigation.goBack()}
                title="Back"
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

export default SignUpScreen;
