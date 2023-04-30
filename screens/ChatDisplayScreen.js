/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
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
      chat_id: props.route.params.chat_id,
      isLoading: true,
      chatData: [],
      newMessage: '',
    };
  }

  componentDidMount() {
    const navigation = this.props;
    this.unsubscribe = navigation.navigation.addListener('focus', () => {
      const { chat_id } = this.state;
      getSingleChatData(chat_id)
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
    const to_send = {
      // eslint-disable-next-line react/destructuring-assignment
      message: this.state.newMessage,
    };
    const { chat_id } = this.state;
    sendChatMessage(chat_id, to_send)
      .then(() => {
        getSingleChatData(chat_id)
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
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    console.log(this.state.chatData);
    return (
      <View style={styles.backgroundContainer}>

        <ChatHeader
          chatName={this.state.chatData.name}
          onCancel={this.handleCancel}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DraftMessages', { chat_id: this.state.chat_id, chat_name: this.state.chatData.name })} style={styles.detailsBtn}>
            <View style={styles.chatDisplayBtn}>
              <Text style={styles.buttonText}>Draft a Message</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatDetails', { chat_id: this.state.chat_id, chatData: this.state.chatData })} style={styles.detailsBtn}>
            <View style={styles.chatDisplayBtn}>
              <Text style={styles.buttonText}>Details</Text>
            </View>
          </TouchableOpacity>
        </View>

        <MessageList messages={this.state.chatData.messages} chat_id={this.state.chat_id} navigation={this.props.navigation} />
        <View style={styles.sendMessage}>
          <TextInput
            style={styles.chatInput}
            value={this.state.newMessage}
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
