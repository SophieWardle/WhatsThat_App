/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

// My Components
import Button from '../../components/Button';
// API
import { updateChatDetails } from '../../api/ChatManagement';
// styles
import styles from '../../styles/globalTheme';

class ChatDetailsUpdateScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: props.route.params.chatId,
      newChatName: '',
      error: '',
    };
  }

  // eslint-disable-next-line consistent-return
  validateInput = () => {
    const { newChatName } = this.state;
    if (newChatName === '') {
      return "Chat name can't be empty!";
    }
  };

  updateChat = async () => {
    const toSend = {};
    const { newChatName, chatId } = this.state;
    const error = this.validateInput();
    if (error) {
      this.setState({ error });
      return;
    }
    if (newChatName !== '') {
      toSend.name = newChatName;
    }
    updateChatDetails(chatId, toSend)
      .then(() => {
        this.setState({
          error: 'Name updated!',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { newChatName, error } = this.state;
    const navigation = this.props;
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.updateChatForm}>
          <Text style={styles.formHeader}>Enter a new chat name</Text>

          <TextInput
            style={styles.formInput}
            value={newChatName}
            onChangeText={(newChatName) => this.setState({ newChatName })}
          />
          <Text style={styles.errorMessage}>{error}</Text>
          <Button
            onPress={this.updateChat}
            title="Save"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
          <Button
            onPress={() => navigation.navigation.goBack()}
            title="Back"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    );
  }
}

export default ChatDetailsUpdateScreen;
