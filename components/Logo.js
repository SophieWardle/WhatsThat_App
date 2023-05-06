/* eslint-disable linebreak-style */
/* eslint-disable global-require */
import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../styles/globalTheme';

function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../images/LogoPNG2.png')}
        style={styles.logo}
      />
      <Text style={styles.logoTextContainer}>
        <Text style={styles.logoTextPrimary}>W</Text>
        <Text style={styles.logoTextSecondary}>hats</Text>
        <Text style={styles.logoTextPrimary}>T</Text>
        <Text style={styles.logoTextSecondary}>hat</Text>
      </Text>
    </View>
  );
}

export default Logo;
