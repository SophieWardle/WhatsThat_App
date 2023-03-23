import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BlockedItem from './BlockedItem';

const BlockedList = ({ contacts, navigation }) => {
  return (
    <View style={styles.contactsContainer}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <BlockedItem contact={item} navigation={navigation}/>}
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

export default BlockedList;
