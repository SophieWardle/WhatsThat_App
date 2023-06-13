/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

// My Components
import Button from './Button';

const styles = StyleSheet.create({
  membersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileBtn: {
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

function MemberItem({ member, navigation, chatId }) {
  return (
    <View style={styles.membersRow}>
      <Text>
        {member.first_name}
        {' '}
        {member.last_name}
      </Text>
      <View style={styles.deleteBtn}>
        <Button
          onPress={() => navigation.navigate('ContactProfile', { id: member.user_id })}
          title="Profile"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
      <View style={styles.profileBtn}>
        <Button
          onPress={() => navigation.navigate('DeleteMember', { user_id: member.user_id, chatId })}
          title="X"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

export default MemberItem;
