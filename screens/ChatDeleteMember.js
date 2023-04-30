/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// API
import { removeUserFromChat } from '../api/ChatManagement';

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contactsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
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
      chatId: props.route.params.chat_id,
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
          <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>NO</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.yesBtn}>
          <TouchableOpacity onPress={() => this.handleRemoveUser(chatId, userId)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>YES</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
