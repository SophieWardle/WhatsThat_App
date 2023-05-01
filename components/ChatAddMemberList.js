/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ChatAddMemberItem from './ChatAddMemberItem';

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function ChatAddMemberList({ contacts, chatId, onSelectUser }) {
  return (
    <View style={styles.contactsContainer}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ChatAddMemberItem
            contact={item}
            chat_id={chatId}
            onSelectUser={onSelectUser}
          />
        )}
        // eslint-disable-next-line camelcase
        keyExtractor={({ user_id }, index) => (user_id ? user_id.toString() : index.toString())}
      />
    </View>
  );
}

export default ChatAddMemberList;
