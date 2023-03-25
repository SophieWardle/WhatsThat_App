import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import moment from "moment/moment";


const ChatItem = ({ chat, navigation}) => {
    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatContent}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.name}>{chat.last_message.author.first_name} {chat.last_message.author.last_name}:</Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.message}>{chat.last_message.message}</Text>
        </View>
        <Text style={styles.time}>{moment(chat.last_message.timestamp * 1000).format('DD/MM/YYYY, h:mm a')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Chat", { chat_id: chat.chat_id})}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Open</Text>
          </View>
        </TouchableOpacity>
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

})

export default ChatItem;