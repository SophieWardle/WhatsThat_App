/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// API
import { blockContact } from '../api/ContactManagement';
// MY COMPONENTS
import ConfirmTask from '../components/ConfirmTask';
// STYLES
import styles from '../styles/globalTheme';

export default class ContactsBlockScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.route.params.item.user_id,
      firstName: props.route.params.item.first_name,
      lastName: props.route.params.item.last_name,
    };
  }

  handleCancel = () => {
    const navigation = this.props;
    navigation.navigation.goBack();
  };

  handleConfirm = () => {
    this.handleBlock();
  };

  async handleBlock() {
    const { userId } = this.state;
    const navigation = this.props;
    blockContact(userId)
      .then(async (response) => {
        navigation.navigation.navigate('ContactsScreen');
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.blockContainer}>
          <Text style={styles.confirmText}> You are trying to block: </Text>
          <Text style={styles.confirmTextName}>
            {' '}
            {firstName}
            {' '}
            {lastName}
            {' '}
          </Text>
        </View>
        <View style={styles.blockConfirmContainer}>
          <ConfirmTask
            message="block this user"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        </View>
      </View>
    );
  }
}
