import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MemberList from './MemberList';
//My components
import ChatHeader from "../components/ChatHeader";
//Styles
import styles from '../styles/globalTheme';

const ChatDetails = ({ chatData, navigation, members, chat_id, onCancel }) => {
    console.log("Details chat ID:" + chat_id)
    return (
        <View style={styles.backgroundContainer}>

            <ChatHeader
                chatName={chatData.name}
                onCancel={onCancel}
            />
            <View style={styles.chatDetailsContainer}>


                <View style={styles.chatCreatorContainer}>
                    <Text style={styles.chatCreatorHeader}>Creator's Information</Text>
                    <Text style={styles.chatCreatorDetails}>Name: {chatData.creator.first_name} {chatData.creator.last_name}</Text>
                    <Text style={styles.chatCreatorDetails}>Email: {chatData.creator.email}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("EditChat", { chat_id: chat_id })} style={styles.editBtn}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Edit Chat Name</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddMember", chat_id = { chat_id }, members = { members })} style={styles.addBtn}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Add a Member</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.chatMembers}>
                    <Text style={styles.chatMembersHeader}>Members:</Text>
                    <MemberList members={members} navigation={navigation} chat_id={chat_id} />
                </View>


                <TouchableOpacity style={styles.deleteBtn}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Delete Chat</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>

    );
}



export default ChatDetails;
