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
import { NativeBaseProvider, Heading } from 'native-base';
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
    console.log('chat screen reached');
    const { navigation } = this.props;
    this.unsubscribe = navigation.addListener('focus', () => {
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
    console.log('chats: ', this.state.chats);
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      const { chats } = this.state;
      const navigation = this.props;
      return (
        <NativeBaseProvider>
          <ScrollView style={styles.backgroundContainer}>
            <Heading size="xl" textAlign="center">
              My Chats
            </Heading>
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
        </NativeBaseProvider>
      );
    }
  }
}
