import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//API
import { sendChatMessage } from './api/api';
class DraftsDisplayScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat_id: props.route.params.chat_id,
            chat_name: props.route.params.chat_name,
            message: props.route.params.message
        };
    }

    handleSendDraft = async () => {
        let to_send = {
            message: this.state.message
        }

        const chat_id = this.state.chat_id;
        sendChatMessage(chat_id, to_send)
            .then((responseJson) => {
                
            })
            .catch((error) => {
                console.log(error);
            });
    }


render() {
    const { chat_name, message } = this.state;
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}> {/* Update the event handler */}
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.draftContainer}>
                <Text style={styles.draftTitle}>{chat_name}</Text>
                <Text style={styles.draftContent}>{message}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DraftsEdit")}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DraftsDelete")}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleSendDraft()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Send</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>

    );
};
};

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

export default DraftsDisplayScreen;
