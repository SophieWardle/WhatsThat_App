/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// My components
import DraftList from './components/DraftList';
// My styles
import styles from './styles/globalTheme';

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
      <View style={styles.backgroundContainer}>
        <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
          <View style={styles.backBtn}>
            <Text style={styles.buttonText}>Back</Text>
          </View>
        </TouchableOpacity>
        {drafts.length > 0 ? (
          <DraftList drafts={drafts} navigation={navigation.navigation} />
        ) : (
          <Text style={styles.emptyText}>No drafts found</Text>
        )}
      </View>
    );
  }
}

export default DraftsScreen;
