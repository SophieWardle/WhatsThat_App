import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ActivityIndicator, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

import ChatList from "../components/ChatList";

//API
import { getSingleChatData } from "../api/api";
import { sendChatMessage } from "../api/api";
import MessageList from "../components/MessageList";

export default class ChatDisplayScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat_id: props.route.params.chat_id,
            isLoading: true,
            chatData: [],
            newMessage: ""
        };
    }

    componentDidMount() {
        const chat_id = this.state.chat_id;
        getSingleChatData(chat_id)
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    chatData: responseJson
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSendMessage = async () => {
        let to_send = {
            message: this.state.newMessage
        }
        const chat_id = this.state.chat_id;
        sendChatMessage(chat_id, to_send)
        .then((responseJson) => {
            console.log(responseJson);
            getSingleChatData(chat_id)
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    chatData: responseJson,
                    newMessage: ''
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.backBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <MessageList messages={this.state.chatData.messages} navigation={this.props.navigation} />
                    <View style={styles.sendMessage}>
                        <TextInput
                            style={styles.messageInput}
                            value={this.state.newMessage}
                            onChangeText={(newMessage) => this.setState({ newMessage })}
                        />
                        <TouchableOpacity onPress={() => this.handleSendMessage()}>
                            <View style={styles.sendButton}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backBtn: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    button: {
        backgroundColor: '#1E6738',
        padding: 10,
        borderRadius: 5,
        width: 80,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    sendMessage: {
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    messageInput: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        fontSize: 16,
        marginRight: 10,
    },
});
