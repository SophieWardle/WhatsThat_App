import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import ChatItem from "./ChatItem";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, navigation }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <MessageItem 
                message={item}
                navigation={navigation}
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