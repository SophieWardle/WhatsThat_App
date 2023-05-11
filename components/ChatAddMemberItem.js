/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';

// Styles
import contactStyles from '../styles/contactStyles';
import buttonStyles from '../styles/buttons';

function ChatAddMemberItem({ contact, chatId, onSelectUser }) {
  return (
    <View style={contactStyles.contactsRow}>

      <Text style={contactStyles.contactName}>
        {contact.first_name}
        {' '}
        {contact.last_name}
      </Text>
      
      <View style={buttonStyles.deleteBtn}>
        <TouchableOpacity onPress={() => onSelectUser(contact.user_id)}>
          <View style={buttonStyles.button}>
            <Text style={buttonStyles.buttonTextSmall}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default ChatAddMemberItem;
