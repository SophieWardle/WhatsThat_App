import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DraftsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drafts: [],
    };
  }

  componentDidMount() {
    this.getDrafts();
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}> {/* Update the event handler */}
          <View style={styles.button}>
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DraftsDisplay", { chat_id: item.chat_id, chat_name: item.chat_name, message: item.message })}>
                  <View style={styles.button}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  draftContainer: {
    marginBottom: 16,
  },
  draftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  draftContent: {
    fontSize: 16,
    color: 'gray',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default DraftsScreen;
