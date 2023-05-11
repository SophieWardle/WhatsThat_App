/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

// My Components
import DisplayProfilePicture from './../../components/DisplayProfilePicture';
// API
import { getContactProfile } from './../../api/ContactManagement';
import { getContactProfilePic } from './../../api/api';

const styles = StyleSheet.create({
  contactsProfileContainer: {
    margin: 5,
    backgroundColor: '#f0ece3',
    flex: 1,
    justifyContent: 'center',
  },
  deleteBtn: {
	  marginHorizontal: 10,
	  marginVertical: 20,
  },
  blockBtn: {
	  marginHorizontal: 10,
	  marginBottom: 20,
  },
  button: {
	  backgroundColor: '#bbb5a7',
	  borderRadius: 5,
	  padding: 10,
  },
  buttonText: {
	  color: 'black',
	  textAlign: 'center',
	  fontSize: 16,
	  fontWeight: 'bold',
  },
  /*profilePicture: {
	  width: 150,
	  height: 150,
	  borderRadius: 75,
	  marginBottom: 20,
  },*/
  name: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  marginBottom: 10,
	  paddingLeft: 10,
  },
  email: {
	  fontSize: 18,
	  color: '#666',
	  marginBottom: 20,
	  paddingLeft: 10,
  },
});

export default class ContactProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      id: props.route.params.id,
      contactProfile: [],
      photo: null,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    console.log('1.component mounted');
    getContactProfile(id)
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          contactProfile: responseJson,
        });
        console.log('2.component mounted');
        this.handleFetchPicture(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleFetchPicture = async (id) => {
    try {
      const photo = await getContactProfilePic(id);
      this.setState({ photo }, () => {
        console.log(`logging the photo in handleFetch: ${photo}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, contactProfile } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const navigation = this.props;
    const { photo } = this.state;
    return (
      <View style={styles.contactsProfileContainer}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <DisplayProfilePicture photo={photo} style={styles.profilePicture} />
        <Text style={styles.name}>
          {contactProfile.first_name}
          {' '}
          {contactProfile.last_name}
        </Text>
        <Text style={styles.email}>{contactProfile.email}</Text>

        <View style={styles.deleteBtn}>
          <TouchableOpacity onPress={() => navigation.navigation.navigate('Delete', { item: contactProfile, navigation })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.blockBtn}>
          <TouchableOpacity onPress={() => navigation.navigation.navigate('Block', { item: contactProfile, navigation })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Block</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
