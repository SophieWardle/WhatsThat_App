/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import MemberItem from './MemberItem';

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function MemberList({ members, navigation, chatId }) {
  return (
    <View style={styles.membersContainer}>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <MemberItem
            member={item}
            navigation={navigation}
            chat_id={chatId}
          />
        )}
        // eslint-disable-next-line camelcase
        keyExtractor={({ user_id }, index) => (user_id ? user_id.toString() : index.toString())}
      />
    </View>
  );
}

export default MemberList;
