import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import moment from "moment";



const MessageItem = ({ message, chat_id, navigation }) => {
  return (

    <View style={styles.messageContainer}>
      <View style={styles.messageContent}>
        <Text style={styles.name}>{message.author.first_name}</Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.message}>{message.message}</Text>
      </View>
      <Text style={styles.time}>{moment(message.timestamp * 1000).format('DD/MM/YYYY, h:mm a')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("DeleteMessage", {chat_id: chat_id, message_id: message.message_id, navigation: navigation})}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 10
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 200 / 2,
    marginLeft: 10
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
    flex: 1
  },
  messageContent: {
    flex: 1,
    flexDirection: 'column',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10
  }
});

export default MessageItem;