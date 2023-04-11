import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../styles/globalTheme';

const Logo = () => {
    return (
        <View>
            <Image
            source={require('../images/LogoPNG.png')}
            style={styles.logo}
          />
          <Text style={styles.logoTextContainer}>
            <Text style={styles.logoTextPrimary}>W</Text>
            <Text style={styles.logoTextSecondary}>hats</Text>
            <Text style={styles.logoTextPrimary}>T</Text>
            <Text style={styles.logoTextSecondary}>hat</Text>
          </Text>
        </View>
    )
}

export default Logo;