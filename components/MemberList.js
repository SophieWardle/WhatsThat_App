import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import MemberItem from './MemberItem';

const MemberList = ({ members, navigation, chat_id }) => {
  return (
    <View style={styles.membersContainer}>
      <FlatList
        data={members}
        renderItem={({ item }) => <MemberItem 
          member={item} 
          navigation={navigation}
          chat_id={chat_id}
        />}
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

export default MemberList;