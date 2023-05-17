/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ChatItem from './ChatItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbd4cd',
    borderRadius: 10,
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
function ChatList({ chats, navigation }) {
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
        // eslint-disable-next-line camelcase
        keyExtractor={({ chat_id }) => chat_id.toString()}

      />
    </View>
  );
}

export default ChatList;
