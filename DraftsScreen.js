import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//,my components
import DraftList from './components/DraftList';
//styles
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
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getDrafts();
    })
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
  }

  render() {
    const { drafts } = this.state;
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator/>
        </View>
      );
    } else {
      return (
        <View style={styles.backgroundContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.backBtn}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          {drafts.length > 0 ? (
            <DraftList drafts={drafts} navigation={this.props.navigation} />
          ) : (
            <Text style={styles.emptyText}>No drafts found</Text>
          )}
        </View>
      );
    }
  }
}

export default DraftsScreen;
