/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import buttonStyles from '../styles/buttons';

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 200 / 2,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  message: {
    marginLeft: 10,
    fontSize: 16,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    flex: 1,
  },
  messageContent: {
    flex: 1,
    flexDirection: 'column',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  currentUserMessageContent: {
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    marginRight: 10,
  },
  otherUserMessageContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 10,
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
});

function MessageItem({ message, chatId, navigation }) {
  const [currentUserID, setCurrentUserID] = useState(null);
  const [isEditable, setIsEditable] = useState(null);
  useEffect(() => {
    async function fetchCurrentUserId() {
      const userId = await AsyncStorage.getItem('id');
      setCurrentUserID(parseInt(userId, 10));
    }
    fetchCurrentUserId();
  }, []);

  useEffect(() => {
    const idCheck = currentUserID === message.author.user_id;
    setIsEditable(idCheck);
  }, [currentUserID, message.author.user_id]);

  // Get todays date
  // Check if the timestamp day is today
  // Print 'Today,' if the timestamp is today
  const { timestamp } = message;
  const isToday = moment(timestamp).isSame(moment(new Date()), 'day');

  const formattedTimestamp = isToday
    ? `Today, ${moment(timestamp).format('h:mm a')}`
    : moment(timestamp).format('DD/MM/YYYY, h:mm a');

  const messageContentStyle = isEditable
    ? styles.currentUserMessageContent
    : styles.otherUserMessageContent;

  return (
    <View style={styles.messageContainer}>
      <View style={[styles.messageContent, messageContentStyle]}>
        <Text style={styles.name}>{message.author.first_name}</Text>
        {message.message && (
          <Text style={styles.message}>{message.message}</Text>
        )}
      </View>
      <Text style={styles.time}>{formattedTimestamp}</Text>

      {isEditable && (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('EditMessage', {
            chatId, message_id: message.message_id, message: message.message, navigation,
          })}
          >
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>Edit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DeleteMessage', { chatId, message_id: message.message_id, navigation })}>
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>X</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default MessageItem;
