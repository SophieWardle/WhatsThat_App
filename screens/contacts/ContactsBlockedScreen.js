/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from 'react-native';

// API
import { NativeBaseProvider, Heading } from 'native-base';
import { getBlockedUsers } from '../../api/ContactManagement';
// My Components
import BlockedList from '../../components/BlockedList';
import buttonStyles from '../../styles/buttons';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  contactsContainer: {
	  flex: 1,
	  backgroundColor: '#f0ece3',
	  paddingHorizontal: 16,
	  paddingVertical: 8,
  },
  emptyText: {
	  fontSize: 18,
	  textAlign: 'center',
	  marginTop: 16,
  },
});

export default class ContactsBlockedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      blockedData: [] || props.route.params.contactData,
    };
  }

  componentDidMount() {
    getBlockedUsers()
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          blockedData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const navigation = this.props;
    const { blockedData } = this.state;
    return (
      <NativeBaseProvider>
        <View style={styles.contactsContainer}>
          <Heading size="xl" textAlign="center">
            My Blocked Contacts
          </Heading>
          <View style={buttonStyles.backBtn}>
            <Button
              onPress={() => navigation.navigation.navigate('ContactsScreen')}
              title="Back"
              buttonStyle={buttonStyles.button}
              textStyle={buttonStyles.buttonText}
            />
          </View>
          {blockedData.length > 0 ? (
            <BlockedList blockedContact={blockedData} navigation={navigation.navigation} />
          ) : (
            <Text style={styles.emptyText}>You Haven&apos;t Blocked Anyone.</Text>
          )}
        </View>
      </NativeBaseProvider>
    );
  }
}
