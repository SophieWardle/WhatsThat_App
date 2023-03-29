import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MemberList from './MemberList';
import MessageList from './MessageList';

const ChatDetails = ({ chatData, navigation, members, chat_id }) => {
    console.log("Details chat ID:" + chat_id)
    return (
        <View style={styles.chatDetailsContainer}>
            <View style={styles.backBtn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.chatName}>{chatData.name}</Text>
            <View style={styles.chatCreator}>
                <Text>Creator:</Text>
                <Text style={styles.chatCreatorDetails}>name: {chatData.creator.first_name} {chatData.creator.last_name}</Text>
                <Text style={styles.chatCreatorDetails}>email: {chatData.creator.email}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("EditChat", {chat_id: chat_id} )}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Edit Chat Name</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.chatMembers}>
                <Text>Members:</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AddMember", chat_id = { chat_id }, members = { members })}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Add a Member</Text>
                    </View>
                </TouchableOpacity>
                <MemberList members={members} navigation={navigation} chat_id={chat_id} />
            </View>
            <View style={styles.deleteBtn}>
                <TouchableOpacity >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Delete Chat</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contactsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    deleteBtn: {
        marginLeft: 10
    },
    button: {
        backgroundColor: '#f00',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default ChatDetails;
