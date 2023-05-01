/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import MessageItem from './MessageItem';

const styles = StyleSheet.create({

});

function MessageList({ messages, chatId, navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            chatId={chatId}
            navigation={navigation}
          />

        )}
        // eslint-disable-next-line camelcase
        keyExtractor={({ message_id }) => message_id.toString()}
        inverted
      />
    </View>
  );
}

export default MessageList;
