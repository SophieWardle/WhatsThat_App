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
import { NativeBaseProvider, Heading } from 'native-base';
import { sendChatMessage } from './api/ChatManagement';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0ece3',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    // paddingHorizontal: 20,
    // paddingTop: 10,
  },
  header: {
    flex: 1,
    height: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  draftContainer: {
    marginBottom: 16,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    margin: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  draftTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  draftContent: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  draftDate: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  draftTime: {
    fontSize: 20,
    fontStyle: 'italic',
  },
  messageHolder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

class DraftsDisplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: props.route.params.chatId,
      draftId: props.route.params.draftId,
      chatName: props.route.params.chatName,
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
    console.log(chatId);

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
    const itemIndexToRemove = draftArray.findIndex((item) => item.draftId === draftId);
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
        <NativeBaseProvider>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
              <View style={[styles.button, { width: '25%' }]}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>
            <Heading size="xl" textAlign="center">My Draft For:</Heading>
            <Heading size="lg" textAlign="center">{chatName}</Heading>

            <View style={styles.messageHolder}>
              <Text style={styles.draftContent}>{message}</Text>
            </View>
            <View style={styles.draftContainer}>
              <Heading size="md" textAlign="left">Scheduled For:</Heading>
              <Text style={styles.draftDate}>{date}</Text>
              <Text style={styles.draftTime}>{time}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigation.navigate('DraftsEdit', { message, draftId })}>
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
              <TouchableOpacity onPress={() => this.handleSendDraft()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Send Now</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </NativeBaseProvider>
      );
    }
    return (
      <NativeBaseProvider>
        <View style={styles.container}>

          <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
            <View style={[styles.button, { width: '25%' }]}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <Heading size="xl" textAlign="center">My Draft For:</Heading>
          <Heading size="lg" textAlign="center">{chatName}</Heading>

          <View style={styles.messageHolder}>
            <Text style={styles.draftContent}>{message}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('DraftsEdit', { message, draftId })}>
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
                <Text style={styles.buttonText}>Send Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}

export default DraftsDisplayScreen;
