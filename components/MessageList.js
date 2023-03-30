import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import ChatItem from "./ChatItem";
import MessageItem from "./MessageItem";

const MessageList = async ({ messages, chat_id, navigation }) => {
  const currentUserID = await AsyncStorage.getItem('id');
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <MessageItem 
                message={item}
                chat_id={chat_id}
                navigation={navigation}
                currentUserID={currentUserID}
            />
            )}
          keyExtractor={({ message_id }, index) => message_id.toString()}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({

  })
  export default MessageList;