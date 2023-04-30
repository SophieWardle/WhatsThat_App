/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View } from 'react-native';

// My Components
import ChatAddMemberList from '../components/ChatAddMemberList';

// API
import { getContactList } from '../api/ContactManagement';
import { addUserToChat } from '../api/ChatManagement';

export default class ChatAddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addContactData: [],
      chatId: props.route.params.chat_id,
      userId: props.route.params.user_id,
      members: props.route.params.members,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      getContactList()
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            addContactData: responseJson,
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

  handleAddUserToChat = async (chatId, userId) => {
    const navigation = this.props;
    addUserToChat(chatId, userId)
      .then(async (response) => {
        navigation.navigation.goBack();
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSelectUser = (userId) => {
    const { chatId } = this.state;
    this.setState({ userId }, () => {
      this.handleAddUserToChat(chatId, userId);
    });
  };

  render() {
    const { addContactData, chatId, members } = this.state;
    return (
      <View>
        <ChatAddMemberList
          contacts={addContactData}
          chat_id={chatId}
          members={members}
          onSelectUser={this.handleSelectUser}
        />
      </View>
    );
  }
}
