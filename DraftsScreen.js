import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//styles
import styles from './styles/globalTheme';
class DraftsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
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
      }
    } catch (error) {
      console.error('Error retrieving drafts:', error);
    }
  }

  render() {
    const { drafts } = this.state;
    return (
      <View style={styles.backgroundContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}> 
          <View style={styles.backBtn}>
            <Text style={styles.buttonText}>Back</Text>
          </View>
        </TouchableOpacity>
        {drafts.length > 0 ? (
          <FlatList
            data={drafts}
            renderItem={({ item }) => (
              <View style={styles.draftContainer}>
                <Text style={styles.draftTitle}>{item.chat_name}</Text>
                <Text style={styles.draftContent}>{item.message}</Text>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DraftsDisplay", { draft_id: item.draft_id, chat_id: item.chat_id, chat_name: item.chat_name, message: item.message })}>
                  <View style={styles.openBtn}>
                    <Text style={styles.buttonText}>Open</Text>
                  </View>
                </TouchableOpacity>
                  
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.emptyText}>No drafts found</Text>
        )}
      </View>
    );
  }
}


export default DraftsScreen;
