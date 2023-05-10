/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

// My Components
import ChatAddMemberList from './../../components/ChatAddMemberList';

// API
import { getContactList } from './../../api/ContactManagement';
import { addUserToChat } from './../../api/ChatManagement';
import contactStyles from '../../styles/contactStyles';
import styles from '../../styles/globalTheme';
import { NativeBaseProvider, Heading } from 'native-base';

export default class ChatAddMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addContactData: [],
      chatId: props.route.params.chatId,
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
    console.log(addContactData);
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
          <Heading size="lg" textAlign="center">
            Add a contact to the chat
          </Heading>
          <View style={contactStyles.contactsContainer}>
            {addContactData.length > 0 ? (
              <ChatAddMemberList
                contacts={addContactData}
                chat_id={chatId}
                members={members}
                onSelectUser={this.handleSelectUser}
              />
            ) : (
              <Text style={styles.emptyText}>You currently have no contacts</Text>
            )}
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}
