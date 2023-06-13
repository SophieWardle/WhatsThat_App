/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
// getToday
import TimePicker from 'react-time-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
// My Styles
import buttonStyles from '../../styles/buttons';
// My Components
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  timePicker: {
    width: '100%',
    fontSize: 20,
    height: 200,
  },
});

export default class DraftSchedulingScreen extends Component {
  constructor(props) {
    super(props);

    const today = new Date();

    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');

    this.state = {
      draftMessage: props.route.params.draftMessage,
      chatId: props.route.params.chatId,
      chatName: props.route.params.chatName,
      isScheduled: props.route.params.isScheduled,
      error: '',
      date: false,
      time: '00:00',
      startDate,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleDateChange(propDate) {
    this.setState({ date: propDate });
    console.log(propDate);
  }

  handleTimeChange(propTime) {
    this.setState({ time: propTime });
    console.log(propTime);
  }

  handleSaveScheduledDraft = async () => {
    try {
      const {
        draftMessage,
        chatId,
        chatName,
        isScheduled,
        date,
        time,
        startDate,
      } = this.state; // Access the state
      console.log(`Date: ${date} Time: ${time}`);
      // check if time is empty?
      if (!time) {
        this.setState({ error: 'Please set a time.' });
        return;
      }
      // check if date is empty?
      // check if date+time in past?
      if (!date) {
        this.setState({ error: 'Please set a date.' });
        return;
      }

      if (startDate > date) {
        this.setState({ error: 'Please pick a valid date, must not have passed.' });
        return;
      }

      // Retrieve existing draft messages from AsyncStorage
      const jsonString = await AsyncStorage.getItem('draftMessagesKey');
      console.log(jsonString);
      const draftMessages = jsonString ? JSON.parse(jsonString) : [];
      console.log(draftMessages);

      // Find the last used draft_id
      let lastDraftId = 0;
      if (draftMessages.length > 0) {
        const lastDraft = draftMessages[draftMessages.length - 1];
        lastDraftId = lastDraft.draftId;
      }

      // Generate a new draft_id by adding 1 to the last used draft_id
      const newDraftId = lastDraftId + 1;

      // Add new draft message with the generated draft_id to the draft messages array
      draftMessages.push({
        draftId: newDraftId, message: draftMessage, chatId, chatName, isScheduled, time, date,
      });

      // Save updated draft messages array in AsyncStorage
      await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftMessages));

      // Show success message
      this.setState({ error: 'Draft message saved successfully.' });

      // Clear input field
      this.setState({ draftMessage: '' }); // Update the state
    } catch (error) {
      // Show error message
      this.setState({ error: `Failed to save draft message. Please try again.${error}` });
    }
  };

  render() {
    const {
      startDate,
      date,
      time,
      error,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <DatePicker
            mode="calendar"
            minimumDate={startDate}
            selected={date}
            onDateChange={this.handleDateChange}
          />

          <TimePicker
            onChange={this.handleTimeChange}
            value={time}
            disableClock
            clearIcon={null}
          />
        </View>
        <Text style={styles.errorMessage}>{error}</Text>
        <Button
          onPress={() => this.handleSaveScheduledDraft()}
          title="Draft"
          buttonStyle={styles.button}
          textStyle={buttonStyles.buttonText}
        />
      </View>
    );
  }
}
