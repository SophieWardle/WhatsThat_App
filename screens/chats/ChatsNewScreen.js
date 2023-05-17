/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NativeBaseProvider, Heading } from 'native-base';
// API
import { sendChatMessage, createNewChat } from './../../api/ChatManagement';
// Styles
import styles from './../../styles/globalTheme';
import buttonStyles from './../../styles/buttons';
import formStyles from '../../styles/formStyles';

class ChatsNewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatName: '',
      initialMessageForm: false,
      message: '',
      error: '',
    };
  }

  async onCreateNewChat() {
    const { chatName } = this.state;
    this.setState({ error: '' });

    if (!(chatName)) {
      this.setState({ error: 'Must enter a chat name' });
      return;
    }

    // SEND TO SERVER
    const toSend = {
      name: chatName,
    };
    createNewChat(toSend)
      .then(() => {
        this.setState({ error: 'Chat created! Enter a new message' });
        this.setState({ initialMessageForm: true });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  async onSendMessage() {
    const message = this.state;
    const { navigation } = this.props;
    if (!(message)) {
      this.setState({ error: 'Must enter a message' });
      return;
    }

    // SEND TO SERVER
    const toSend = {
      // eslint-disable-next-line react/destructuring-assignment
      message: this.state.message,
    };

    const chatId = await AsyncStorage.getItem('chat_id');
    sendChatMessage(chatId, toSend)
      .then(() => {
        this.setState({ initialMessageForm: false });
        navigation.navigate('ChatsScreen');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { initialMessageForm, error } = this.state;
    if (initialMessageForm) {
      return (
        <NativeBaseProvider>
          <View style={styles.backgroundContainer}>
          <Heading size="xl" textAlign="center">
            Start Your Chat With a Message
          </Heading>
            <View style={formStyles.formContainer}>
              <Text style={formStyles.formHeader}>Enter your first message:</Text>
              <TextInput
                style={[formStyles.formInput, { width: 300, height: 150}]}
                multiline
                // eslint-disable-next-line react/destructuring-assignment
                value={this.state.message}
                onChangeText={(message) => this.setState({ message })}
              />
              <Text style={styles.errorMessage}>{error}</Text>
              <View style={styles.sendBtn}>
                <TouchableOpacity onPress={() => this.onSendMessage()}>
                  <View style={buttonStyles.button}>
                    <Text style={buttonStyles.buttonText}>SEND</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </NativeBaseProvider>
      );
    }
    const navigation = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
          <Heading size="xl" textAlign="center">
            Create a New Chat
          </Heading>
          <View style={formStyles.formContainer}>
            <Text style={formStyles.formHeader}>Enter a chat name:</Text>
            <TextInput
              style={formStyles.formInput}
              // eslint-disable-next-line react/destructuring-assignment
              value={this.state.chatName}
              onChangeText={(chatName) => this.setState({ chatName })}
            />
            <Text style={styles.errorMessage}>{error}</Text>
            <View style={styles.createBtn}>
              <TouchableOpacity onPress={() => this.onCreateNewChat()}>
                <View style={buttonStyles.button}>
                  <Text style={buttonStyles.buttonText}>Create New Chat</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.createBtn}>
              <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
                <View style={buttonStyles.button}>
                  <Text style={buttonStyles.buttonText}>Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </NativeBaseProvider>

    );
  }
}
export default ChatsNewScreen;
