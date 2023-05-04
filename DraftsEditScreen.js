/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
  header: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
  },
  signupbtn: {
    marginTop: 10,
    backgroundColor: 'green',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',

  },
  backBtn: {
    marginTop: 10,
    backgroundColor: 'red',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

class DraftsEditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draftId: props.route.params.draftId,
      message: props.route.params.message,
      error: '',
    };
  }

  handleEditDraft = async () => {
    try {
      const { message, draftId } = this.state;
      const navigation = this.props;

      // Update the draft message in AsyncStorage
      const drafts = await AsyncStorage.getItem('draftMessagesKey'); // Update the key here
      const updatedDrafts = JSON.parse(drafts) || [];
      console.log(`draftsArray: ${JSON.stringify(updatedDrafts)}`);

      // Find the index of the draft to be updated
      const draftIndex = updatedDrafts.findIndex((draft) => draft.draftId === draftId);
      console.log(`draft index: ${draftIndex}`);
      // Update the message of the draft in the updatedDrafts array
      if (draftIndex > -1) {
        updatedDrafts[draftIndex].message = message;
      }

      // Save the updated drafts array back to AsyncStorage
      await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(updatedDrafts)); // Update the key here
      console.log(`updated drafts:${JSON.stringify(updatedDrafts)}`);
      // Optionally, you can show a success message to the user
      console.log('Draft updated successfully');

      // Navigate back to the previous screen
      navigation.navigation.navigate('Drafts');
    } catch (error) {
      // Handle error
      console.error('Error updating draft:', error);
      this.setState({ error: 'Error updating draft' });
    }
  };

  messageHandler = (newMessage) => {
    this.setState({ message: newMessage });
  };

  render() {
    const { message, error } = this.state;
    const navigation = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your message:</Text>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={this.messageHandler}
        />
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity onPress={this.handleEditDraft}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DraftsEditScreen;
