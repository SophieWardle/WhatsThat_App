/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeBaseProvider, Heading } from 'native-base';

// API
import { updateUserProfile, getUserProfileData } from './../../api/UserManagement';
// Styles
import styles from './../../styles/globalTheme';
import buttonStyles from './../../styles/buttons';
import formStyles from '../../styles/formStyles';

export default class ProfileUpdateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      firstName: '',
      lastName: '',
      email: '',
      error: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
      getUserProfileData()
        .then((responseJson) => {
          this.setState({ userData: responseJson }, this.populateForm);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  firstNameHandler = (firstname) => {
    this.setState({ firstName: firstname });
  };

  lastNameHandler = (lastname) => {
    this.setState({ lastName: lastname });
  };

  emailHandler = (email) => {
    this.setState({ email });
  };

  async updateProfile() {
    const toSend = {};
    const {
      userData,
      firstName,
      lastName,
      email,
    } = this.state;

    const validator = require('email-validator');
    if (!validator.validate(email)) {
      this.setState({
        error: 'Must enter valid email',
      })
      return;
    }
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0 ) {
      this.setState({
        error: 'Fields can not be empty',
      })
      return;
    }
    console.log(userData);
    if (firstName !== userData.first_name) {
      toSend.first_name = firstName;
    }

    if (lastName !== userData.last_name) {
      toSend.last_name = lastName;
    }

    if (email !== userData.email) {
      toSend.email = email;
    }

    updateUserProfile(toSend)
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateForm() {
    const { userData } = this.state;
    const { first_name, last_name, email } = userData;
    this.setState({
      firstName: first_name,
      lastName: last_name,
      email: email,
    });
  }
  

  render() {
    const {
      firstName,
      lastName,
      email,
      error,
    } = this.state;
    const navigation = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
          <Heading size="xl" textAlign="center">
            Edit Your Profile Details:
          </Heading>

          <TouchableOpacity onPress={() => navigation.navigation.navigate('ProfileScreen')} style={buttonStyles.backBtn}>
              <View style={buttonStyles.button}>
                <Text style={buttonStyles.buttonText}>Back</Text>
              </View>
          </TouchableOpacity>
        <View style={formStyles.formContainer}>
          <Text style={styles.formHeader}>First name:</Text>
          <TextInput
            onChangeText={this.firstNameHandler}
            value={firstName}
            style={styles.formInput}
          />
          <Text style={styles.formHeader}>Last name:</Text>
          <TextInput
            onChangeText={this.lastNameHandler}
            value={lastName}
            style={styles.formInput}
          />
          <Text style={styles.formHeader}>Email:</Text>
          <TextInput
            onChangeText={this.emailHandler}
            value={email}
            style={styles.formInput}
          />
          <Text style={styles.errorMessage}>{error}</Text>
          <View style={buttonStyles.buttonContainer}>
            <TouchableOpacity onPress={() => this.updateProfile()}>
              <View style={buttonStyles.button}>
                <Text style={buttonStyles.buttonText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </NativeBaseProvider>
    );
  }
}
