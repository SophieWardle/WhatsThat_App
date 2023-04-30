/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
}
  from 'react-native';
import styles from '../styles/globalTheme';
import ChatList from '../components/ChatList';

// API
import { getChatListData } from '../api/ChatManagement';

export default class ChatsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      chats: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      getChatListData()
        .then((responseJson) => {
          console.log('Response:', responseJson);
          this.setState({
            isLoading: false,
            chats: responseJson,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { isLoading, chats } = this.state;
    if (isLoading === true) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      const navigation = this.props;
      return (
        <ScrollView style={styles.backgroundContainer}>
          <Text style={styles.pageHeader}>
            My Chats
          </Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('NewChat')}>
              <View style={styles.chatsButton}>
                <Text style={styles.chatsBtnText}>Create a New Chat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigation.navigate('Drafts')}>
              <View style={styles.chatsButton}>
                <Text style={styles.chatsBtnText}>My Drafts</Text>
              </View>
            </TouchableOpacity>
          </View>
          {chats.length > 0 ? (
            <ChatList chats={chats} navigation={navigation.navigation} />
          ) : (
            <Text style={styles.emptyText}>You Currently Have No Chats. Try Creating One.</Text>
          )}
        </ScrollView>
      );
    }
  }
}
