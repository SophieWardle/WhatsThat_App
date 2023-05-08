/* eslint-disable linebreak-style */
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

// My Components
import { NativeBaseProvider, Heading } from 'native-base';
import ContactList from '../components/ContactList';
// API
import { getContactList } from '../api/ContactManagement';

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
  searchFormBtn: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  searchBtn: {
    marginLeft: 10,
    width: '40%',
  },
  blockedBtn: {
    marginRight: 10,
    width: '40%',
  },
  button: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    // eslint-disable-next-line no-dupe-keys
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contactData: [] || props.route.params.contactData,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
      getContactList()
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            contactData: responseJson,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
    const { contactData } = this.state;
    return (
      <NativeBaseProvider>
        <View style={styles.contactsContainer}>
          <Heading size="xl" textAlign="center">
            My Contacts
          </Heading>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('Search', { getContactData: this.getContactData })} style={styles.searchBtn}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigation.navigate('BlockedContacts', { getContactData: this.getContactData })} style={styles.blockedBtn}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Blocked Users</Text>
              </View>
            </TouchableOpacity>
          </View>
          {contactData.length > 0 ? (
            <ContactList contacts={contactData} navigation={navigation.navigation} />
          ) : (
            <Text style={styles.emptyText}>
              You Currently Have No Contacts. Try searching for someone.
            </Text>
          )}
        </View>
      </NativeBaseProvider>
    );
  }
}
