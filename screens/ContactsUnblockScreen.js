/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// API
import { unblockContact } from '../api/ContactManagement';
// MY COMPONENTS
import ConfirmTask from '../components/ConfirmTask';
// STYLES
import styles from '../styles/globalTheme';

export default class ContactsUnblockScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.route.params.item.user_id,
      firstName: props.route.params.item.first_name,
      lastName: props.route.params.item.last_name,
    };

    this.handleUnblock = this.handleUnblock.bind(this);
  }

  handleCancel = () => {
    const navigation = this.props;
    navigation.navigation.goBack();
  };

  handleConfirm = () => {
    this.handleUnblock();
  };

  handleUnblock = async () => {
    const { userId } = this.state;
    const navigation = this.props;
    unblockContact(userId)
      .then(async (response) => {
        navigation.navigation.navigate('ContactsScreen');
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { firstName, lastName } = this.state;
    return (
      <View style={styles.backgroundContainer}>
        <Text> You are trying to unblock: </Text>
        <Text>
          {' '}
          {firstName}
          {' '}
          {lastName}
          {' '}
        </Text>
        <ConfirmTask
          message="unblock this user"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </View>
    );
  }
}
