/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Input, Icon, NativeBaseProvider, Heading,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
// API
import { updateUserPassword } from '../../services/ProfileServices';
// Styles
import styles from '../../styles/globalTheme';
import buttonStyles from '../../styles/buttons';
import formStyles from '../../styles/formStyles';
// My Components
import Button from '../../components/Button';

export default class PassUpdateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      error: '',
      show: false,
    };
  }

  passwordHandler = (password) => {
    this.setState({ password });
  };

  confirmPasswordHandler = (confirmPassword) => {
    this.setState({ confirmPassword });
  };

  async updateProfile() {
    const toSend = {};
    const {
      password,
      confirmPassword,
    } = this.state;
    const REGEX_PASS = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (password !== confirmPassword) {
      this.setState({
        error: 'Passwords must match',
      });
      return;
    }

    if (!(password && confirmPassword)) {
      this.setState({
        error: 'Must fill in all fields',
      });
      return;
    }
    if (!REGEX_PASS.test(password)) {
      this.setState({
        error: 'Password isn\'t strong enough (One upper, one lower, one special, one number, at least 8 characters long',
      });
      return;
    }

    if (password === confirmPassword) {
      toSend.password = password;
    }

    try {
      const message = await updateUserPassword(toSend);
      this.setState({
        error: message,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      password,
      confirmPassword, error, show,
    } = this.state;
    const navigation = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
          <Heading size="xl" textAlign="center">
            Change Your Password:
          </Heading>
          <View style={buttonStyles.backBtn}>
            <Button
              onPress={() => navigation.navigation.navigate('ProfileScreen')}
              title="Back"
              buttonStyle={buttonStyles.button}
              textStyle={buttonStyles.buttonText}
            />
          </View>
          <View style={formStyles.formContainer}>
            <Text style={styles.formHeader}>Password:</Text>
            <Input
              onChangeText={this.passwordHandler}
              value={password}
              style={styles.formInput}
              type={show ? 'text' : 'password'}
              InputRightElement={(
                <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
                  <TouchableOpacity onPress={() => this.setState({ show: !show })}>
                    <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size="lg" mr={2} color="muted.400" bg="gray.100" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={styles.formHeader}>Confirm Password:</Text>
            <Input
              onChangeText={this.confirmPasswordHandler}
              value={confirmPassword}
              style={styles.formInput}
              type={show ? 'text' : 'password'}
              InputRightElement={(
                <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
                  <TouchableOpacity onPress={() => this.setState({ show: !show })}>
                    <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size="lg" mr={2} color="muted.400" bg="gray.100" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={styles.errorMessage}>{error}</Text>
            <View style={buttonStyles.buttonContainer}>
              <Button
                onPress={() => this.updateProfile()}
                title="Save"
                buttonStyle={buttonStyles.button}
                textStyle={buttonStyles.buttonText}
              />
            </View>
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}
