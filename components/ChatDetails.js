/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text,
} from 'react-native';
import MemberList from './MemberList';
// My components
import ChatHeader from './ChatHeader';
import Button from './Button';
// Styles
import styles from '../styles/globalTheme';
import buttonStyles from '../styles/buttons';

function ChatDetails({
  chatData, navigation, members, chatId, onCancel,
}) {
  return (
    <View style={styles.backgroundContainer}>

      <ChatHeader
        chatName={chatData.name}
        onCancel={onCancel}
      />
      <View style={styles.chatDetailsContainer}>

        <View style={styles.chatCreatorContainer}>
          <Text style={styles.chatCreatorHeader}>Creator&apos;s Information</Text>
          <Text style={styles.chatCreatorDetails}>
            Name:
            {chatData.creator.first_name}
            {' '}
            {chatData.creator.last_name}
          </Text>
          <Text style={styles.chatCreatorDetails}>
            Email:
            {chatData.creator.email}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('EditChat', { chatId })}
            style={styles.editBtn}
            title="Edit Chat Name"
            buttonStyle={styles.button}
            textStyle={buttonStyles.buttonText}
          />
          <Button
            onPress={() => navigation.navigate('AddMember', { chatId, members: [...members] })}
            style={styles.button}
            title="Add a Member"
            buttonStyle={styles.button}
            textStyle={buttonStyles.buttonText}
          />
        </View>

        <View style={styles.chatMembers}>
          <Text style={styles.chatMembersHeader}>Members:</Text>
          <MemberList members={members} navigation={navigation} chatId={chatId} />
        </View>

      </View>
    </View>

  );
}

export default ChatDetails;
