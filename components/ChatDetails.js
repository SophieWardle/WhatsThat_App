/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import MemberList from './MemberList';
// My components
import ChatHeader from './ChatHeader';
// Styles
import styles from '../styles/globalTheme';

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
          <TouchableOpacity onPress={() => navigation.navigate('EditChat', { chatId })} style={styles.editBtn}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Edit Chat Name</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddMember', { chatId, members: [...members] })}
            style={styles.addBtn}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add a Member</Text>
            </View>
          </TouchableOpacity>

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
