/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/globalTheme'; //

function ScheduledDraftItem({ item, navigation }) {
  return (
    <View style={styles.draftContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DraftsDisplay', {
        draft_id: item.draft_id,
        chat_id: item.chat_id,
        chat_name: item.chat_name,
        message: item.message,
      })}
      >
        <Text style={styles.draftTitle}>{item.chat_name}</Text>
        <Text style={styles.draftContent}>{item.message}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ScheduledDraftItem;
