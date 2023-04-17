import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from "moment";

const MessageItem = ({ message, chat_id, navigation }) => {
  const [currentUserID, setCurrentUserID] = useState(null);
  const [isEditable, setIsEditable] = useState(null);

  useEffect(() => {
    async function fetchCurrentUserId() {
      const userId = await AsyncStorage.getItem('id');
      console.log("User ID:" + userId);
      setCurrentUserID(userId);
    }
    fetchCurrentUserId();
  }, []);
  
  useEffect(() => {
    console.log("currentUserID", currentUserID);
    console.log("message.author.user_id", message.author.user_id);
    let idCheck = currentUserID == message.author.user_id;
    setIsEditable(idCheck);
    console.log("isEditable?", isEditable);
  }, [currentUserID, message.author.user_id]);
  

  return (
    <View style={styles.messageContainer}>
      <View style={styles.messageContent}>
        <Text style={styles.name}>{message.author.first_name}</Text>
        {message.message && (
          <Text  style={styles.message}>{message.message}</Text>
        )}
      </View>
      <Text style={styles.time}>{moment(message.timestamp).format('DD/MM/YYYY, h:mm a')}</Text>

      {isEditable && (
        <TouchableOpacity onPress={() => navigation.navigate("EditMessage", { chat_id: chat_id, message_id: message.message_id, message: message.message, navigation: navigation })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("DeleteMessage", { chat_id: chat_id, message_id: message.message_id, navigation: navigation })}>
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