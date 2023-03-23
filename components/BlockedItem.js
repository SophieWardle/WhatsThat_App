import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BlockedItem = ({ contact, navigation }) => {
  console.log(contact);
  return (
    <View style={styles.contactsRow}>
      <Text>{contact.first_name} {contact.last_name}</Text>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={() => navigation.navigate("Unblock", { id: contact.user_id })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Unblock</Text>
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

export default BlockedItem;
