/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

// My Components
import { NativeBaseProvider, Heading } from 'native-base';
import Button from '../../components/Button';

// API
import { updateChatMessage } from '../../api/ChatManagement';
import buttonStyles from '../../styles/buttons';
import formStyles from '../../styles/formStyles';

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
      chatId: props.route.params.chatId,
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
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
          <Heading size="xl" textAlign="center">
            Edit Your Message:
          </Heading>
          <View style={buttonStyles.backBtn}>
            <Button
              onPress={() => navigation.navigation.goBack()}
              title="Back"
              buttonStyle={buttonStyles.button}
              textStyle={buttonStyles.buttonText}
            />
          </View>
          <View style={formStyles.formContainer}>
            <TextInput
              value={message}
              style={[formStyles.formInput, { width: 300, height: 150 }]}
              multiline
              onChangeText={this.messageHandler}
            />
            <Text style={styles.errorMessage}>{error}</Text>
            <Button
              onPress={() => this.handleUpdate(chatId, messageId)}
              title="Update Message"
              buttonStyle={styles.button}
              textStyle={buttonStyles.buttonText}
            />
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}
