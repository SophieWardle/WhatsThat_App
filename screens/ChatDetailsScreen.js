/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

// My components
import ChatDetails from '../components/ChatDetails';

// API
import { getSingleChatData } from '../api/ChatManagement';

export default class ChatDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      chatDetails: props.route.params.chatData,
      chatId: props.route.params.chatId,
      members: props.route.params.members,
    };
  }

  componentDidMount() {
    const { chatId } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      getSingleChatData(chatId)
        .then((responseJson) => {
          this.setState({
            chatDetails: responseJson,
            members: responseJson.members,
            isLoading: false,
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

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const { chatDetails, members, chatId } = this.state;
    const navigation = this.props;
    return (
      <View>
        <ChatDetails
          chatData={chatDetails}
          navigation={navigation.navigation}
          members={members}
          chatId={chatId}
          onCancel={this.handleCancel}
        />
      </View>
    );
  }
}
