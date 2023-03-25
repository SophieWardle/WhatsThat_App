import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatAddMemberItem = ({ contact, chat_id, addFunction}) => {
  console.log("item contact:" + contact);
  console.log("item chat id:" + chat_id);
  console.log("item function:" + addFunction);
  return (
    <View style={styles.contactsRow}>
      <Text>{contact.first_name} {contact.last_name}</Text>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={() => addFunction(contact.user_id,chat_id)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
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

export default ChatAddMemberItem;
