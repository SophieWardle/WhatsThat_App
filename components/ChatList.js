import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import ChatItem from "./ChatItem";

const ChatList = ({ chats, navigation }) => {
  
    return (
      <View style={styles.container}>
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <ChatItem 
                chat={item}
                navigation={navigation}
            />
            )}
          keyExtractor={({ chat_id }, index) => chat_id.toString()}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f0ece3',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
  export default ChatList;