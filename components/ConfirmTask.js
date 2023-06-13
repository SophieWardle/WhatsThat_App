/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text } from 'react-native';

// My Components
import Button from './Button';

// My Styles
import styles from '../styles/globalTheme';
import buttonStyles from '../styles/buttons';

function ConfirmTask({ message, onCancel, onConfirm }) {
  return (
    <View style={styles.confirmContainer}>
      <Text style={styles.confirmText}>{`Are you sure you want to ${message}?`}</Text>
      <View style={styles.confirmButtonContainer}>
        <View style={styles.noBtn}>
          <Button
            onPress={onCancel}
            title="NO"
            buttonStyle={styles.button}
            textStyle={buttonStyles.buttonText}
          />
        </View>
        <View style={styles.yesBtn}>
          <Button
            onPress={onConfirm}
            title="YES"
            buttonStyle={styles.button}
            textStyle={buttonStyles.buttonText}
          />
        </View>
      </View>
    </View>
  );
}

export default ConfirmTask;
