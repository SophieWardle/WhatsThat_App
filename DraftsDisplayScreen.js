/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API
import { sendChatMessage } from './api/ChatManagement';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  draftContainer: {
    marginBottom: 16,
  },
  draftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  draftContent: {
    fontSize: 16,
    color: 'gray',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

class DraftsDisplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: props.route.params.chat_id,
      draftId: props.route.params.draft_id,
      chatName: props.route.params.chat_name,
      message: props.route.params.message,
      isScheduled: props.route.params.isScheduled,
      date: props.route.params.date,
      time: props.route.params.time,
    };
  }

  handleSendDraft = async () => {
    const { message, chatId, draftId } = this.state;
    const navigation = this.props;
    const toSend = {
      message,
    };

    sendChatMessage(chatId, toSend)
      .then(async () => {
        await this.handleDeleteDraft(draftId);
        navigation.navigation.navigate('Drafts');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDeleteDraft = async (draftId) => {
    const currentDrafts = await AsyncStorage.getItem('draftMessagesKey');
    const navigation = this.props;

    const draftArray = JSON.parse(currentDrafts) || [];

    // find index of draft w/matching id
    const itemIndexToRemove = draftArray.findIndex((item) => item.draft_id === draftId);
    if (itemIndexToRemove !== -1) {
      // remove draft
      draftArray.splice(itemIndexToRemove, 1);

      // store updated array
      await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftArray));
      navigation.navigation.navigate('Drafts');
    }
  };

  // eslint-disable-next-line class-methods-use-this
  handleRescheduleDraft = async () => {
    console.log('Need to reschedule');
  };

  // eslint-disable-next-line class-methods-use-this
  handleScheduleDraft = async () => {
    console.log('Need to schedule');
  };

  render() {
    const {
      chatName,
      message,
      draftId,
      isScheduled,
      date,
      time,
    } = this.state;
    const navigation = this.props;
    if (isScheduled) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.draftContainer}>
            <Text style={styles.draftTitle}>{chatName}</Text>
            <Text style={styles.draftContent}>{message}</Text>
            <Text style={styles.draftDate}>{date}</Text>
            <Text style={styles.draftTime}>{time}</Text>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('DraftsEdit', { message, draft_id: draftId })}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Edit message</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleDeleteDraft(draftId)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleRescheduleDraft()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Reschedule</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.draftContainer}>
          <Text style={styles.draftTitle}>{chatName}</Text>
          <Text style={styles.draftContent}>{message}</Text>
          <TouchableOpacity onPress={() => navigation.navigation.navigate('DraftsEdit', { message, draft_id: draftId })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Edit message</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleDeleteDraft(draftId)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleScheduleDraft()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Schedule</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSendDraft()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

export default DraftsDisplayScreen;
