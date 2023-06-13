/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';

// My Components
import Button from './Button';

// My Styles
import contactStyles from '../styles/contactStyles';

const styles = StyleSheet.create({
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
  contactStyling: {
    fontSize: 16,
  },
  contactPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

function ContactItem({ contact, navigation, onFetchPicture }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (contact.user_id) {
      onFetchPicture(contact.user_id)
        // eslint-disable-next-line no-shadow
        .then((photo) => setPhoto(photo));
    }
  }, [contact.user_id, onFetchPicture]);

  return (
    <View style={contactStyles.contactsRow}>
      <Image
        source={{
          uri: photo,
        }}
        style={styles.contactPhoto}
      />
      <Text style={styles.contactStyling}>
        {contact.first_name}
        {' '}
        {contact.last_name}
      </Text>
      <View style={styles.deleteBtn}>
        <Button
          onPress={() => navigation.navigate('ContactProfile', { id: contact.user_id })}
          title="View Profile"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

export default ContactItem;
