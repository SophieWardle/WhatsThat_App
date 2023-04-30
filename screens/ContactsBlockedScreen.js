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
  TouchableOpacity,
} from 'react-native';

// API
import { getBlockedUsers } from '../api/ContactManagement';
// My Components
import BlockedList from '../components/BlockedList';

const styles = StyleSheet.create({
  contactsContainer: {
	  flex: 1,
	  backgroundColor: '#f0ece3',
	  paddingHorizontal: 16,
	  paddingVertical: 8,
  },
  contactsRow: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  marginVertical: 8,
  },
  buttonContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  marginBottom: 10,
  },
  button: {
	  backgroundColor: '#bbb5a7',
	  borderRadius: 5,
	  padding: 10,
  },
  backBtn: {
	  marginLeft: 10,
	  width: '40%',
  },
  buttonText: {
	  color: 'black',
	  fontSize: 18,
	  textAlign: 'center',
	  fontWeight: 'bold',
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
      <View style={styles.contactsContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigation.navigate('ContactsScreen')} style={styles.backBtn}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        {blockedData.length > 0 ? (
          <BlockedList blockedContact={blockedData} navigation={navigation.navigation} />
        ) : (
          <Text style={styles.emptyText}>You Haven&apos;t Blocked Anyone.</Text>
        )}
      </View>
    );
  }
}
