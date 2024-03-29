/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// My Components
import Button from '../../components/Button';

// API
import { removeUserFromChat } from '../../api/ChatManagement';
import buttonStyles from '../../styles/buttons';

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchFormBtn: {
    textAlign: 'center',
  },
});

export default class ChatDeleteMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.route.params.user_id,
      chatId: props.route.params.chatId,
    };
  }

  handleRemoveUser = async (chatId, userId) => {
    const navigation = this.props;
    removeUserFromChat(chatId, userId)
      .then(() => {
        navigation.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { chatId, userId } = this.state;
    const navigation = this.props;
    return (
      <View>
        <Text>Are you sure you want to remove this user?</Text>
        <View style={styles.noBtn}>
          <Button
            onPress={() => navigation.navigation.goBack()}
            title="NO"
            buttonStyle={styles.button}
            textStyle={buttonStyles.buttonText}
          />
        </View>
        <View style={styles.yesBtn}>
          <Button
            onPress={() => this.handleRemoveUser(chatId, userId)}
            title="YES"
            buttonStyle={styles.button}
            textStyle={buttonStyles.buttonText}
          />
        </View>
      </View>
    );
  }
}
