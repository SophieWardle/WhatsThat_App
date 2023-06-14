/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { View } from 'react-native';
import ConfirmTask from '../../components/ConfirmTask';
// API
import { logoutUser } from '../../api/UserManagement';
// My styles
import styles from '../../styles/globalTheme';

export default class ProfileScreen extends Component {
  handleCancel = () => {
    const navigation = this.props;
    navigation.navigation.goBack();
  };

  handleConfirm = () => {
    this.logout();
  };

  async logout() {
    const navigation = this.props;
    logoutUser()
      .then(() => {
        navigation.navigation.navigate('Login');
      })
      .catch((error) => {
        navigation.navigation.navigate('Login');
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <ConfirmTask
          message="log out"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />

      </View>
    );
  }
}
