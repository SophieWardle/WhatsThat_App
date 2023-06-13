/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// My components
import { NativeBaseProvider, Heading } from 'native-base';
import DraftList from '../../components/DraftList';
import Button from '../../components/Button';
// My styles
import styles from '../../styles/globalTheme';
import buttonStyles from '../../styles/buttons';

class DraftsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
      this.getDrafts();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getDrafts = async () => {
    try {
      // Retrieve drafts from AsyncStorage
      const draftsData = await AsyncStorage.getItem('draftMessagesKey');
      if (draftsData) {
        const draftsArray = JSON.parse(draftsData);
        this.setState({ drafts: draftsArray });
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error retrieving drafts:', error);
    }
  };

  render() {
    const { drafts, isLoading } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    const navigation = this.props;
    return (
      <NativeBaseProvider>
        <View style={styles.backgroundContainer}>
          <Heading size="xl" textAlign="center">My Drafts</Heading>
          <Button
            onPress={() => navigation.navigation.goBack()}
            title="Back"
            buttonStyle={styles.backBtn}
            textStyle={buttonStyles.buttonText}
          />
          {drafts.length > 0 ? (
            <DraftList drafts={drafts} navigation={navigation.navigation} />
          ) : (
            <Text style={styles.emptyText}>No drafts found</Text>
          )}
        </View>
      </NativeBaseProvider>
    );
  }
}

export default DraftsScreen;
