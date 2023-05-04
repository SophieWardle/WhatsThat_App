/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/globalTheme';

function ScheduledDraftItem({ item, navigation }) {
  return (
    <View style={styles.draftContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DraftsDisplay', {
        draftId: item.draftId,
        chatId: item.chatId,
        chatName: item.chatName,
        message: item.message,
        isScheduled: item.isScheduled,
        date: item.date,
        time: item.time,
      })}
      >
        <Text style={styles.draftTitle}>{item.chatName}</Text>
        <Text style={styles.draftContent}>{item.message}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ScheduledDraftItem;
