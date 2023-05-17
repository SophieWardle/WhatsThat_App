/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// API
import { searchForUser } from '../../api/UserManagement';
import { addContact } from '../../api/ContactManagement';
import contactStyles from '../../styles/contactStyles';
import buttonStyles from '../../styles/buttons';

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: '#f0ece3',
    padding: 20,
  },

  searchFormBtn: {
    textAlign: 'center',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },

  resultsContainer: {
    flex: 1,
    backgroundColor: '#f0ece3',
    paddingHorizontal: 16,
    paddingVertical: 8,

  },
  addBtn: {
    borderRadius: 5,
    padding: 1,
  },
  button: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  searchBtn: {
    marginTop: 20,
    marginBottom: 10,
  },
  closeBtn: {
    width: '40%',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    top: 2,
    left: 10,
  },
});

export default class ContactsSearch extends Component {
  constructor(props) {
    super(props);
    this.handleContactData.bind(this);

    this.state = {
      isLoading: false,
      q: '',
      searchIn: 'all',
      limit: 10,
      currentIndex: 0,
      addError: '',
      error: '',
      showResults: false,
      currentPage: 1,
      maxPages: 0,
      resultsPerPage: 10,
    };
  }

  handleContactData = () => {
    // this.props.setStateOfParent(contactData);
    const navigation = this.props;
    navigation.navigation.navigate('ContactsScreen');
  };

  async onPressSearch() {
    const { q, searchIn, currentIndex, limit, } = this.state;
    const toSend = {
      q,
      search_in: searchIn,
      offset: currentIndex,
      limit,
    };


    const query = Object.keys(toSend)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(toSend[key])}`)
      .join('&');

    searchForUser(query)
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          resultsData: responseJson,
          showResults: true,
          q: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async addContact(userId) {
    const queryId = userId;
    const navigation = this.props;

    addContact(queryId)
      .then(() => {
        this.setState({
          isLoading: false,
          showResults: false,
        });
        navigation.navigation.navigate('ContactsScreen');
      })
      .catch((error) => {
        this.setState({ addError: error });
      });
  }

  hideResults() {
    this.setState({ showResults: false });
  }

  handleNextPage = () => {
    const nextIndex = this.state.currentIndex + 10;
    // const maxPages = Math.ceil(resultsData.length / 10);
    this.setState({ currentIndex: nextIndex }, () => this.onPressSearch());
  };

  handlePrevPage = () => {
    const nextIndex = this.state.currentIndex - 10;
    this.setState({ currentIndex: nextIndex }, () => this.onPressSearch())
  };

  render() {
    const {
      isLoading, showResults, addError, resultsData, limit, currentIndex,
    } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
      // eslint-disable-next-line no-else-return
    } else if (showResults) {
      console.log("current index: " + currentIndex);
      return (
        <View style={styles.resultsContainer}>

          <Text style={styles.errorMessage}>{addError}</Text>

          <View style={styles.closeBtn}>
            <TouchableOpacity onPress={() => this.hideResults()} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
          {resultsData.length === 0 ? (
            <Text>No more results</Text>
          ) : (
            <FlatList
              data={resultsData}
              renderItem={({ item }) => (
                <View style={contactStyles.contactsRow}>
                  <Text>
                    {item.given_name}
                    {' '}
                    {item.family_name}
                  </Text>
                  <View style={styles.addBtn}>
                    <TouchableOpacity onPress={() => this.addContact(item.user_id)}>
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>Add</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={({ id }) => id}
            />
          )}


          <View style={buttonStyles.buttonContainer}>
            {currentIndex > 0 && (
              <TouchableOpacity onPress={this.handlePrevPage}>
                <View style={[buttonStyles.button, buttonStyles.prevBtn]}>
                  <Text style={styles.buttonText}>Previous</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={this.handleNextPage}>
              <View style={[buttonStyles.button, buttonStyles.nextBtn]}>
                <Text style={styles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      const { error } = this.state;
      const navigation = this.props;
      return (
        <View style={styles.searchContainer}>
          <Text style={styles.header}>Search:</Text>
          <TextInput
            style={styles.input}
            value={this.q}
            onChangeText={(q) => this.setState({ q })}
          />
          <Text style={styles.header}>Search in:</Text>
          <Picker
            style={styles.input}
            selectedValue={this.search_in}
            onValueChange={(itemValue) => this.setState({ searchIn: itemValue })}
          >
            <Picker.Item label="All Users" value="all" />
            <Picker.Item label="Contacts" value="contacts" />
          </Picker>
          <Text style={styles.errorMessage}>{error}</Text>
          <View style={styles.searchBtn}>
            <TouchableOpacity onPress={() => this.onPressSearch()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.backBtn}>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('ContactsScreen')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
