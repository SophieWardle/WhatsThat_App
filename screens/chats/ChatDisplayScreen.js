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
} from 'react-native';

// Styles
import styles from '../../styles/globalTheme';
// API
import { sendChatMessage, getSingleChatData } from '../../api/ChatManagement';
// My components
import MessageList from '../../components/MessageList';
import ChatHeader from '../../components/ChatHeader';
import Button from '../../components/Button';
import buttonStyles from '../../styles/buttons';

export default class ChatDisplayScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: props.route.params.chatId,
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
          console.log(`chat id${chatId}`);
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
          <Button
            onPress={() => navigation.navigation.navigate('DraftMessages', { chatId, chatName: chatData.name })}
            title="Draft a Message"
            buttonStyle={buttonStyles.button}
            textStyle={buttonStyles.buttonText}
          />
          <Button
            onPress={() => navigation.navigation.navigate('ChatDetails', { chatId, chatData })}
            title="Details"
            buttonStyle={buttonStyles.button}
            textStyle={buttonStyles.buttonText}
          />
        </View>
        <View style={{ flex: 1 }}>
          <MessageList
            messages={chatData.messages}
            chatId={chatId}
            navigation={navigation.navigation}
            style={{ flex: 1 }}
          />
          <View style={styles.sendMessageContainer}>
            <View style={styles.sendMessage}>
              <TextInput
                style={styles.chatInput}
                value={newMessage}
                onChangeText={(newMessage) => this.setState({ newMessage })}
              />
              <Button
                onPress={() => this.handleSendMessage()}
                title="Send"
                buttonStyle={styles.sendButton}
                textStyle={styles.sendButtonText}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
