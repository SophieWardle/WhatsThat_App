import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import ChatItem from "./ChatItem";

const ChatList = ({ chats, navigateToNewChat }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <ChatItem 
                chat={item}
            />
            )}
          keyExtractor={({ chat_id }, index) => chat_id.toString()}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({

  })
  export default ChatList;