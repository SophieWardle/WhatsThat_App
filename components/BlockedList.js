/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import BlockedItem from './BlockedItem';
import contactStyles from '../styles/contactStyles';

function BlockedList({ blockedContact, navigation }) {
  return (
    <View style={contactStyles.contactsContainer}>
      <FlatList
        data={blockedContact}
        renderItem={({ item }) => <BlockedItem blockedContact={item} navigation={navigation} />}
        keyExtractor={({ id }, index) => (id ? id.toString() : index.toString())}
      />
    </View>
  );
}

export default BlockedList;
