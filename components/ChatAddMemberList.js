import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ChatAddMemberItem from './ChatAddMemberItem';

const ChatAddMemberList = ({ contacts, chat_id, onSelectUser }) => {
    console.log("list contact:" + contacts);
    console.log("list chat id:" + chat_id);
  return (
    <View style={styles.contactsContainer}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <ChatAddMemberItem
         contact={item}
         chat_id={chat_id}
         onSelectUser={onSelectUser}
         />
        }
        keyExtractor={({ user_id }, index) => user_id ? user_id.toString() : index.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default ChatAddMemberList;
