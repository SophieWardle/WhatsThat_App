/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, Heading } from 'native-base';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

// My Components
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0ece3',
    flex: 1,
    // justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
  },
  input: {
    textAlign: 'left',
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 20,
  },
  header: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
  },
  button: {
    backgroundColor: '#bbb5a7',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    margin: 5,
    marginLeft: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageHolder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    height: '50%',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
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
      <NativeBaseProvider>
        <View style={styles.container}>
          <Button
            onPress={() => navigation.navigation.goBack()}
            title="Back"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />

          <Heading size="lg" textAlign="center">Editing Draft Message</Heading>
          <View style={styles.messageHolder}>
            <Heading size="md" textAlign="center">Your Message:</Heading>
            <TextInput
              multiline
              style={styles.input}
              value={message}
              onChangeText={this.messageHandler}
            />
          </View>
          <Text style={styles.errorMessage}>{error}</Text>
          <Button
            onPress={this.handleEditDraft}
            title="Save"
            buttonStyle={[styles.button, { marginTop: 30 }]}
            textStyle={styles.buttonText}
          />
        </View>
      </NativeBaseProvider>
    );
  }
}

export default DraftsEditScreen;
