import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/globalTheme';

const ChatHeader = ({chatName, onCancel}) => {
    return (
        <View style={styles.chatName}>
            <TouchableOpacity onPress={onCancel} style={styles.backBtn}>
                <View style={styles.chatDisplayBtn}>
                    <Text style={styles.buttonText}>Back</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.chatNameText}>{chatName}</Text>
        </View>
    )
}

export default ChatHeader;