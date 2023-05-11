/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// Styles
import contactStyles from '../styles/contactStyles';
import buttonStyles from '../styles/buttons';

function BlockedItem({ blockedContact, navigation }) {
  return (
    <View style={contactStyles.contactsRow}>

      <Text style={contactStyles.contactName}>
        {blockedContact.first_name}
        {' '}
        {blockedContact.last_name}
      </Text>
      
      <View style={buttonStyles.deleteBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Unblock', { item: blockedContact, navigation })}>
          <View style={buttonStyles.button}>
            <Text style={buttonStyles.buttonTextSmall}>Unblock</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default BlockedItem;
