/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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

function BlockedItem({ blockedContact, navigation }) {
  return (
    <View style={styles.contactsRow}>
      <Text>
        {blockedContact.first_name}
        {' '}
        {blockedContact.last_name}
      </Text>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Unblock', { item: blockedContact, navigation })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Unblock</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default BlockedItem;
