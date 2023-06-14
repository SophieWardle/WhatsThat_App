/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Input, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
// My Styles
import styles from '../styles/globalTheme';

function SingupForm({
  firstname,
  lastname,
  email,
  password,
  show,
  onNameChange,
  onSurnameChange,
  onEmailChange,
  onPasswordChange,
  error,
}) {
  return (
    <View style={[styles.formContainer, { flex: 3, paddingHorizontal: 20 }]}>
      <View style={styles.borderBackground}>
        <Text style={styles.formHeader}>First name:</Text>
        <Input
          placeholder="Enter first name"
          style={styles.formInput}
          value={firstname}
          onChangeText={onNameChange}
          InputLeftElement={(
            <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
              <Icon as={<MaterialIcons name="person" />} size="lg" ml={2} color="muted.400" />
            </View>
                  )}
        />
        <Text style={styles.formHeader}>Last name:</Text>
        <Input
          placeholder="Enter last name"
          style={styles.formInput}
          value={lastname}
          onChangeText={onSurnameChange}
          InputLeftElement={(
            <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
              <Icon as={<MaterialIcons name="person" />} size="lg" ml={2} color="muted.400" />
            </View>
                  )}
        />
        <Text style={styles.formHeader}>Email:</Text>
        <Input
          placeholder="Enter Email"
          style={styles.formInput}
          value={email}
          onChangeText={onEmailChange}
          InputLeftElement={(
            <View style={{ backgroundColor: '#d8d8d8', borderRadius: 5, padding: 10 }}>
              <Icon as={<MaterialIcons name="email" />} size="lg" ml={2} color="muted.400" />
            </View>
                  )}
        />
        <Text style={styles.formHeader}>Password:</Text>
        <Input
          placeholder="Enter Password"
          style={styles.formInput}
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry={!show}
        />
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    </View>
  );
}

export default SingupForm;
