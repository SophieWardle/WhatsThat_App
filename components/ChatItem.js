/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import moment from 'moment/moment';

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#f0ece3',
  },
  chatContent: {
    flex: 1,
    paddingRight: 16,
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
  },
  messageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    color: '#777',
    fontSize: 12,
    alignSelf: 'flex-end',
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
  return (
    <View style={styles.chatContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Chat', { chat_id: chat.chat_id })}>
        <View style={styles.chatContent}>
          <Text style={styles.chatName}>{chat.name}</Text>
          {chat.last_message.message ? (
            <>
              <Text style={styles.name}>
                {chat.last_message.author.first_name}
                {chat.last_message.author.last_name}
                :
              </Text>
              <View style={styles.messageTimeContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
                  {chat.last_message.message}
                </Text>
                <Text style={styles.time}>
                  {moment(chat.last_message.timestamp).format('DD/MM/YYYY, h:mm a')}
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.message}>No messages yet</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ChatItem;
