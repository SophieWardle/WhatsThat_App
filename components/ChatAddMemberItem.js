/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text,
} from 'react-native';

// My Components
import Button from './Button';

// Styles
import contactStyles from '../styles/contactStyles';
import buttonStyles from '../styles/buttons';

function ChatAddMemberItem({ contact, onSelectUser }) {
  return (
    <View style={contactStyles.contactsRow}>

      <Text style={contactStyles.contactName}>
        {contact.first_name}
        {' '}
        {contact.last_name}
      </Text>
      <View style={buttonStyles.deleteBtn}>
        <Button
          onPress={() => onSelectUser(contact.user_id)}
          title="Add"
          buttonStyle={buttonStyles.button}
          textStyle={buttonStyles.buttonTextSmall}
        />
      </View>

    </View>
  );
}

export default ChatAddMemberItem;
