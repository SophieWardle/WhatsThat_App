import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/globalTheme';
const ConfirmTask = ({ message, onCancel, onConfirm }) => {
  return (
    <View style={styles.confirmContainer}>
      <Text>{`Are you sure you want to ${message}?`}</Text>
      <View style={styles.noBtn}>
        <TouchableOpacity onPress={onCancel}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>NO</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.yesBtn}>
        <TouchableOpacity onPress={onConfirm}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>YES</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
/*
const styles = StyleSheet.create({
  noBtn: {
    // Style for NO button container
  },
  yesBtn: {
    // Style for YES button container
  },
  button: {
    // Style for button
  },
  buttonText: {
    // Style for button text
  },
});
*/
export default ConfirmTask;
