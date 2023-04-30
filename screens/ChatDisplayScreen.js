/* eslint-disable linebreak-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

// Styles
import styles from '../styles/globalTheme';
// API
import { sendChatMessage, getSingleChatData } from '../api/ChatManagement';
// My components
import MessageList from '../components/MessageList';
import ChatHeader from '../components/ChatHeader';

export default class ChatDisplayScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: props.route.params.chat_id,
      isLoading: true,
      chatData: [],
      newMessage: '',
    };
  }

  componentDidMount() {
    const navigation = this.props;
    this.unsubscribe = navigation.navigation.addListener('focus', () => {
      const { chatId } = this.state;
      getSingleChatData(chatId)
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            chatData: responseJson,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCancel = () => {
    const navigation = this.props;
    navigation.navigation.goBack();
  };

  handleSendMessage = async () => {
    const toSend = {
      // eslint-disable-next-line react/destructuring-assignment
      message: this.state.newMessage,
    };
    const { chatId } = this.state;
    sendChatMessage(chatId, toSend)
      .then(() => {
        getSingleChatData(chatId)
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              chatData: responseJson,
              newMessage: '',
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const isLoading = this.state;
    if (isLoading === true) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const navigation = this.props;
    const { chatData, chatId, newMessage } = this.state;
    return (
      <View style={styles.backgroundContainer}>

        <ChatHeader
          chatName={chatData.name}
          onCancel={this.handleCancel}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigation.navigate('DraftMessages', { chat_id: chatId, chat_name: chatData.name })} style={styles.detailsBtn}>
            <View style={styles.chatDisplayBtn}>
              <Text style={styles.buttonText}>Draft a Message</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigation.navigate('ChatDetails', { chat_id: chatId, chatData })} style={styles.detailsBtn}>
            <View style={styles.chatDisplayBtn}>
              <Text style={styles.buttonText}>Details</Text>
            </View>
          </TouchableOpacity>
        </View>

        <MessageList
          messages={chatData.messages}
          chat_id={chatId}
          navigation={navigation.navigation}
        />
        <View style={styles.sendMessage}>
          <TextInput
            style={styles.chatInput}
            value={newMessage}
            onChangeText={(newMessage) => this.setState({ newMessage })}
          />
          <TouchableOpacity onPress={() => this.handleSendMessage()}>
            <View style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
