/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BlockedItem from './BlockedItem';

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
  },
});

function BlockedList({ blockedContact, navigation }) {
  return (
    <View style={styles.contactsContainer}>
      <FlatList
        data={blockedContact}
        renderItem={({ item }) => <BlockedItem blockedContact={item} navigation={navigation} />}
        keyExtractor={({ id }, index) => (id ? id.toString() : index.toString())}
      />
    </View>
  );
}

export default BlockedList;
