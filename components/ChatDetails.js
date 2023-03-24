import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatDetails = (chatData) => {
    console.log(chatData);
    return (
        <View style={styles.chatDetailsContainer}>
            <Text style={styles.chatName}>{chatData.name}</Text>
            <View style={styles.chatCreator}>
                <Text style={styles.chatCreatorDetails}>{chatData.creator.first_name}{chatData.creator.last_name}</Text>
                <Text style={styles.chatCreatorDetails}>{chatData.creator.email}</Text>
            </View>
            <View style={styles.chatMembers}>
                <Text style={styles.chatMembersDetails}>{chatData.members.first_name}{chatData.members.last_name}</Text>
            </View>
            <View style={styles.deleteBtn}>
                <TouchableOpacity onPress={() => navigation.navigate("Unblock", { item: blockedContact, navigation: navigation })}>
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

export default BlockedItem;
