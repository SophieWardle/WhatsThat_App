/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ContactItem from './ContactItem';

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
  },
});

function ContactList({ contacts, navigation }) {
  return (
    <View style={styles.contactsContainer}>

      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            navigation={navigation}
          />
        )}
        keyExtractor={({ id }, index) => (id ? id.toString() : index.toString())}
      />

    </View>
  );
}

export default ContactList;
