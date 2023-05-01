/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  contactsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteBtn: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#bbb5a7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

function ContactItem({ contact, navigation }) {
  return (
    <View style={styles.contactsRow}>
      <Text>
        {contact.first_name}
        {' '}
        {contact.last_name}
      </Text>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('ContactProfile', { id: contact.user_id })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Profile</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default ContactItem;
