import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, navigation, handleFetchPicture }) => {
  return (
    <View style={styles.contactsContainer}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <ContactItem 
          contact={item} 
          navigation={navigation}
          handleFetchPicture={handleFetchPicture}/>}
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

export default ContactList;
