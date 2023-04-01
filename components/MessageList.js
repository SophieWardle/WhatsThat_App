import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

import MessageItem from "./MessageItem";


const MessageList = ({ messages, chat_id, navigation }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <MessageItem 
                message={item}
                chat_id={chat_id}
                navigation={navigation}
            />
            
            )}
          keyExtractor={({ message_id }, index) => message_id.toString()}
          inverted
          />
      </View>
    );
  };

  const styles = StyleSheet.create({

  })

  export default MessageList;