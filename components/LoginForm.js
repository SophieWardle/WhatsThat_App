/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Input, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
// My Styles
import styles from '../styles/globalTheme';

function LoginForm({
  email, password, show, onEmailChange, onPasswordChange, onTogglePasswordVisibility, error,
}) {
  return (
    <View style={styles.formContainer}>
      <View style={styles.borderBackground}>
        <Text style={styles.formHeader}>Email:</Text>
        <Input
          placeholder="Enter Email"
          style={styles.formInput}
          value={email}
          onChangeText={onEmailChange}
          InputLeftElement={(
            <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
              <Icon as={<MaterialIcons name="email" />} size="lg" ml={2} color="muted.400" bg="gray.100" />
            </View>
            )}
        />
        <Text style={styles.formHeader}>Password:</Text>
        <Input
          placeholder="Enter Password"
          style={styles.formInput}
          value={password}
          onChangeText={onPasswordChange}
          type={show ? 'text' : 'password'}
          InputRightElement={(
            <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
              <TouchableOpacity onPress={onTogglePasswordVisibility}>
                <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size="lg" mr={2} color="muted.400" bg="gray.100" />
              </TouchableOpacity>
            </View>
            )}
        />
      </View>
      <Text style={styles.errorMessage}>{error}</Text>
    </View>
  );
}

export default LoginForm;
