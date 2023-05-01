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
    backgroundColor: '#f00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

function ChatAddMemberItem({ contact, chatId, onSelectUser }) {
  return (
    <View style={styles.contactsRow}>
      <Text>
        {contact.first_name}
        {' '}
        {contact.last_name}
      </Text>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={() => onSelectUser(contact.user_id)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default ChatAddMemberItem;
