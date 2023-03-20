import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import moment from "moment/moment";


export default function ChatItem({ chat }) {
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatContent}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.name}>{chat.last_message.author.first_name} {chat.last_message.author.last_name}:</Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.message}>{chat.last_message.message}</Text>
        </View>
        <Text style={styles.time}>{moment(chat.last_message.timestamp * 1000).format('DD/MM/YYYY, h:mm a')}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
  message: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    color: '#777',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
})

