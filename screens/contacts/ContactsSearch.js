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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// My Components
import Button from '../../components/Button';
// API
import { searchForUser } from '../../api/UserManagement';
import { addContact } from '../../api/ContactManagement';
// My Styles
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
    };
  }

  handleContactData = () => {
    // this.props.setStateOfParent(contactData);
    const navigation = this.props;
    navigation.navigation.navigate('ContactsScreen');
  };

  async onPressSearch() {
    const {
      q,
      searchIn,
      currentIndex,
      limit,
    } = this.state;
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

  handleNextPage = () => {
    const { currentIndex } = this.state;
    const nextIndex = currentIndex + 10;
    // const maxPages = Math.ceil(resultsData.length / 10);
    this.setState({ currentIndex: nextIndex }, () => this.onPressSearch());
  };

  handlePrevPage = () => {
    const { currentIndex } = this.state;
    const nextIndex = currentIndex - 10;
    this.setState({ currentIndex: nextIndex }, () => this.onPressSearch());
  };

  hideResults() {
    this.setState({ showResults: false });
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

  render() {
    const {
      isLoading, showResults, addError, resultsData, currentIndex,
    } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
      // eslint-disable-next-line no-else-return
    } else if (showResults) {
      return (
        <View style={styles.resultsContainer}>

          <Text style={styles.errorMessage}>{addError}</Text>

          <View style={styles.closeBtn}>
            <Button
              onPress={() => this.hideResults()}
              title="Close"
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
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
                    <Button
                      onPress={() => this.addContact(item.user_id)}
                      title="Add"
                      buttonStyle={styles.button}
                      textStyle={styles.buttonText}
                    />
                  </View>
                </View>
              )}
              keyExtractor={({ id }) => id}
            />
          )}

          <View style={buttonStyles.buttonContainer}>
            {currentIndex > 0 && (
              <Button
                onPress={this.handlePrevPage}
                title="Previous"
                buttonStyle={[buttonStyles.button, buttonStyles.prevBtn]}
                textStyle={styles.buttonText}
              />
            )}
            <Button
              onPress={this.handleNextPage}
              title="Next"
              buttonStyle={[buttonStyles.button, buttonStyles.nextBtn]}
              textStyle={styles.buttonText}
            />
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
            <Button
              onPress={() => this.onPressSearch()}
              title="Search"
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
          <View style={styles.backBtn}>
            <Button
              onPress={() => navigation.navigation.navigate('ContactsScreen')}
              title="Back"
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      );
    }
  }
}
