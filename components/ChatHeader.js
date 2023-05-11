/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/globalTheme';
import buttonStyles from '../styles/buttons';

function ChatHeader({ chatName, onCancel }) {
  return (
    <View style={styles.chatName}>
      <TouchableOpacity onPress={onCancel} style={styles.backBtn}>
        <View style={buttonStyles.button}>
          <Text style={buttonStyles.buttonText}>Back</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.chatNameText}>{chatName}</Text>
    </View>
  );
}

export default ChatHeader;
