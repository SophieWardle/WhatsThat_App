/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

// My Components
import Button from './Button';

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
        <Button
          onPress={() => navigation.navigate('Unblock', { item: blockedContact, navigation })}
          title="Unblock"
          buttonStyle={buttonStyles.button}
          textStyle={buttonStyles.buttonTextSmall}
        />
      </View>

    </View>
  );
}

export default BlockedItem;
