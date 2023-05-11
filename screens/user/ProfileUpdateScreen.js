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

// API
import { updateUserProfile, getUserProfileData } from './../../api/UserManagement';
// Styles
import styles from './../../styles/globalTheme';
import buttonStyles from './../../styles/buttons';

export default class ProfileUpdateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
      getUserProfileData()
        .then((responseJson) => {
          this.setState({
            userData: responseJson,
          });
          this.populateForm();
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
    console.log('1st name handler called');
  };

  lastNameHandler = (lastname) => {
    this.setState({ lastName: lastname });
    console.log('last name handler called');
  };

  emailHandler = (email) => {
    this.setState({ email });
  };

  passwordHandler = (password) => {
    this.setState({ password });
  };

  async updateProfile() {
    const toSend = {};
    const {
      userData,
      firstName,
      lastName,
      email,
      password,
    } = this.state;

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

    if (password) {
      toSend.password = password;
    }

    console.log(`Update Profile Function${toSend.first_name}${toSend.last_name}${toSend.email}`);

    updateUserProfile(toSend)
      .then(() => {
        this.setState({
          error: 'Profile updated!',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateForm() {
    const { userData } = this.state;
    const newFirstname = userData.first_name;
    const newLastname = userData.last_name;
    const newEmail = userData.email;
    this.setState({ firstName: newFirstname });
    this.setState({ lastName: newLastname });
    this.setState({ email: newEmail });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      error,
      password,
    } = this.state;
    const navigation = this.props;
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.profileEditContainer}>
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
          <Text style={styles.formHeader}>Password:</Text>
          <TextInput
            onChangeText={this.passwordHandler}
            value={password}
            style={styles.formInput}
          />
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity onPress={() => this.updateProfile()}>
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>Save</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigation.navigate('ProfileScreen')}>
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
