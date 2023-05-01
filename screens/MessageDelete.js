/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View } from 'react-native';
// API
import { deleteChatMessage } from '../api/ChatManagement';
// MY COMPONENTS
import ConfirmTask from '../components/ConfirmTask';
// STYLES
import styles from '../styles/globalTheme';

export default class MessageDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageId: props.route.params.message_id,
      chatId: props.route.params.chatId,
    };
  }

  handleCancel = () => {
    const navigation = this.props;
    navigation.navigation.goBack();
  };

  handleConfirm = () => {
    this.handleDelete();
  };

  async handleDelete() {
    const { chatId, messageId } = this.state;
    const navigation = this.props;
    deleteChatMessage(chatId, messageId)
      .then(() => {
        navigation.navigation.goBack();
      })
      .catch((err) => {
        console.log(`error${err}`);
      });
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <ConfirmTask
          message="delete this message"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </View>
    );
  }
}
