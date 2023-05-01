/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// API
import { updateChatMessage } from '../api/ChatManagement';

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

});

export default class MessageUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.route.params.message,
      messageId: props.route.params.message_id,
      chatId: props.route.params.chat_id,
    };
  }

  handleUpdate = async (chatId, messageId) => {
    const toSend = {};
    const { message } = this.state;
    const navigation = this.props;

    if (message !== '') {
      toSend.message = message;
    }
    updateChatMessage(chatId, messageId, toSend)
      .then(() => {
        this.setState({
          error: 'updated message success',
        });
        navigation.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  messageHandler = (msg) => {
    this.setState({ message: msg });
  };

  render() {
    const {
      message,
      chatId,
      messageId,
      error,
    } = this.state;
    const navigation = this.props;
    return (
      <View>
        <TextInput
          value={message}
          onChangeText={this.messageHandler}
        />
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity onPress={() => this.handleUpdate(chatId, messageId)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Update Message</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
