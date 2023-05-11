/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './../styles/globalTheme';
import buttonStyles from './../styles/buttons';

function ConfirmTask({ message, onCancel, onConfirm }) {
  return (
    <View style={styles.confirmContainer}>
      <Text style={styles.confirmText}>{`Are you sure you want to ${message}?`}</Text>
      <View style={styles.confirmButtonContainer}>
        <View style={styles.noBtn}>
          <TouchableOpacity onPress={onCancel}>
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>NO</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.yesBtn}>
          <TouchableOpacity onPress={onConfirm}>
            <View style={styles.button}>
              <Text style={buttonStyles.buttonText}>YES</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ConfirmTask;
