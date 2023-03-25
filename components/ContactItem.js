import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import DisplayContactPicture from './DisplayContactPicture';
const ContactItem = ({ contact, navigation, handleFetchPicture }) => {
  console.log("Contact_id: "+ contact.user_id);
  return (
    <View style={styles.contactsRow}>
      <Text>{contact.first_name} {contact.last_name}</Text>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("ContactProfile", { id: contact.user_id })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Profile</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  deleteBtn: {
    marginLeft: 10
  },
  button: {
    backgroundColor: '#f00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default ContactItem;
