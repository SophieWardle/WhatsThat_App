/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native';
import moment from 'moment/moment';
import { Text, NativeBaseProvider, Flex } from 'native-base';

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f0ece3',
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  name: {
    color: '#777',
    fontSize: 14,
    marginBottom: 4,
    width: '100%',
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#777',
    width: '100%',
  },
  time: {
    color: '#777',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 0,
    width: 80, // Set a fixed width for the timestamp
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

function ChatItem({ chat, navigation }) {
  const timestamp = chat.last_message.timestamp;
  const isToday = moment(timestamp).isSame(moment(new Date()), 'day');
  const formattedTimestamp = isToday
    ? 'Today, ' + moment(timestamp).format('h:mm a')
    : moment(timestamp).format('DD/MM/YYYY, h:mm a');

  return (
    <NativeBaseProvider>
      <View style={styles.chatContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: chat.chat_id })}>
          <View style={styles.chatContent}>
            <Text style={styles.chatName}>{chat.name}</Text>
            {chat.last_message.message ? (
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>
                    {chat.last_message.author.first_name} {chat.last_message.author.last_name}:
                  </Text>
                  <Text isTruncated maxW='100%' numberOfLines={1} style={styles.message}>
                    {chat.last_message.message}
                  </Text>
                </View>
                <Text style={styles.time}>{formattedTimestamp}</Text>
              </View>
            ) : (
              <Text style={styles.message}>No messages yet</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
}


export default ChatItem;

