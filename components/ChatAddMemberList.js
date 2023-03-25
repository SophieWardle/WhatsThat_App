import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ChatAddMemberItem from './ChatAddMemberItem';

const ChatAddMemberList = ({ contacts, chat_id, addFunction }) => {
    console.log("list contact:" + contacts);
    console.log("list chat id:" + chat_id);
    console.log("list function:" + addFunction);
  return (
    <View style={styles.contactsContainer}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <ChatAddMemberItem
         contact={item}
         chat_id={chat_id}
         addFunction={addFunction}
         />
        }
        keyExtractor={({ id }, index) => id ? id.toString() : index.toString()} />
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
