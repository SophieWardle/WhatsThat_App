/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
}
  from 'react-native';
import { NativeBaseProvider, Heading } from 'native-base';
import styles from '../../styles/globalTheme';
import ChatList from '../../components/ChatList';

// My Components
import Button from '../../components/Button';
// API
import { getChatListData } from '../../api/ChatManagement';

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
    const navigation = this.props;
    console.log('chats: ', chats);
    console.log('isLoading: ', isLoading);
    if (chats.length === 0) {
      return (
        <NativeBaseProvider>
          <ScrollView style={[styles.backgroundContainer, { paddingTop: '8px' }]}>
            <Heading size="xl" textAlign="center">
              My Chats
            </Heading>
            <View style={styles.rowContainer}>
              <Button
                onPress={() => navigation.navigation.navigate('NewChat')}
                title="Create a New Chat"
                buttonStyle={styles.chatsButton}
                textStyle={styles.chatsBtnText}
              />
              <Button
                onPress={() => navigation.navigation.navigate('Drafts')}
                title="My Drafts"
                buttonStyle={styles.chatsButton}
                textStyle={styles.chatsBtnText}
              />
            </View>
            <Text style={styles.emptyText}>You Currently Have No Chats. Try Creating One.</Text>
          </ScrollView>
        </NativeBaseProvider>
      );
    } else {
      return (
        <NativeBaseProvider>
          <ScrollView style={styles.backgroundContainer}>
            <Heading size="xl" textAlign="center">
              My Chats
            </Heading>
            <View style={styles.rowContainer}>
              <Button
                onPress={() => navigation.navigation.navigate('NewChat')}
                title="Create a New Chat"
                buttonStyle={styles.chatsButton}
                textStyle={styles.chatsBtnText}
              />
              <Button
                onPress={() => navigation.navigation.navigate('Drafts')}
                title="My Drafts"
                buttonStyle={styles.chatsButton}
                textStyle={styles.chatsBtnText}
              />
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
