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
import { NativeBaseProvider, Heading } from 'native-base';

// My Components
import ContactList from './../../components/ContactList';
// API
import { getContactList } from './../../api/ContactManagement';
import { getContactProfilePic } from './../../api/api';
// My Styles
import buttonStyles from './../../styles/buttons';

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

  handleFetchPicture = async (id) => {
    try {
      const photo = await getContactProfilePic(id);
      console.log(`logging the photo in handleFetch: ${photo}`);
      return photo;
    } catch (error) {
      console.log(error);
      return null;
    }
  };  

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
          <View style={buttonStyles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('Search', { getContactData: this.getContactData })} style={buttonStyles.searchBtn}>
              <View style={buttonStyles.button}>
                <Text style={buttonStyles.buttonText}>Search</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigation.navigate('BlockedContacts', { getContactData: this.getContactData })} style={buttonStyles.blockedBtn}>
              <View style={buttonStyles.button}>
                <Text style={buttonStyles.buttonText}>Blocked Users</Text>
              </View>
            </TouchableOpacity>
          </View>
          {contactData.length > 0 ? (
            <ContactList contacts={contactData} navigation={navigation.navigation} onFetchPicture={this.handleFetchPicture}/>
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
