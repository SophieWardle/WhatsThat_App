/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Switch,
} from 'react-native';
// styles
import styles from '../../styles/globalTheme';
import buttonStyles from '../../styles/buttons';

export default class DraftMessagesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatId: props.route.params.chatId,
      chatName: props.route.params.chatName,
      draftMessage: '',
      isScheduled: false,
      error: '',
    };
  }

  handlePress = async () => {
    const {
      draftMessage, chatId, chatName, isScheduled,
    } = this.state;
    const navigation = this.props;
    if (isScheduled) {
      navigation.navigation.navigate('DraftScheduling', {
        chatId, draftMessage, chatName, isScheduled,
      });
    } else {
      if (draftMessage.trim().length === 0) {
        this.setState({ error: 'Message must not be empty' });
        return;
      }
      this.handleSaveDraftMessage();
    }
  };

  toggleSwitch = (value) => {
    this.setState({ isScheduled: value });
  };

  handleSaveDraftMessage = async () => {
    try {
      const {
        draftMessage, chatId, chatName, isScheduled,
      } = this.state;
      if (draftMessage.trim().length === 0) {
        this.setState({ error: 'Message must not be empty' });
      }

      const jsonString = await AsyncStorage.getItem('draftMessagesKey');
      const draftMessages = jsonString ? JSON.parse(jsonString) : [];

      // Find the last used draft_id
      let lastDraftId = 0;
      if (draftMessages.length > 0) {
        const lastDraft = draftMessages[draftMessages.length - 1];
        lastDraftId = lastDraft.draftId;
      }
      console.log(chatId);
      // Generate a new draft_id by adding 1 to the last used draft_id
      const newDraftId = lastDraftId + 1;
      // Add new draft message with the generated draft_id to the draft messages array
      draftMessages.push({
        draftId: newDraftId,
        message: draftMessage,
        chatId,
        chatName,
        isScheduled,
      });
      // Save updated draft messages array in AsyncStorage
      await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftMessages));

      this.setState({ error: 'Draft message saved successfully.' });
      this.setState({ draftMessage: '' });
    } catch (error) {
      // Show error message
      this.setState({ error: 'Failed to save draft message. Please try again.' });
    }
  };

  render() {
    const {
      draftMessage,
      chatName,
      isScheduled,
      error,
    } = this.state;
    const navigation = this.props;
    return (
      <View style={styles.draftMsgContainer}>

        <Text style={styles.formHeader}>
          Draft a message for:
          {' '}
          {chatName}
        </Text>
        <TextInput
          style={styles.textInput}
          value={draftMessage}
          onChangeText={(newDraftMessage) => this.setState({ draftMessage: newDraftMessage })}
          placeholder="Enter your draft message..."
          multiline
        />

        <Text style={styles.formHeader}>
          Schedule:
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isScheduled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={this.toggleSwitch}
          value={isScheduled}
        />

        <Text style={styles.errorMessage}>{error}</Text>
        <View style={buttonStyles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigation.goBack()} style={buttonStyles.backBtn}>
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress()}>
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>Draft</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
