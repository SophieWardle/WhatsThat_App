import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BlockedItem from './BlockedItem';

const BlockedList = ({ blockedContact, navigation }) => {
  return (
    <View style={styles.contactsContainer}>
      <FlatList
        data={blockedContact}
        renderItem={({ item }) => <BlockedItem blockedContact={item} navigation={navigation}/>}
        keyExtractor={({ id }, index) => id ? id.toString() : index.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
  }
});

export default BlockedList;
