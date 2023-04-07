import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ActivityIndicator, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

import ChatList from "../components/ChatList";

//API
import { getSingleChatData } from "../api/api";
import { sendChatMessage } from "../api/api";
import MessageList from "../components/MessageList";
import { deleteChatMessage } from "../api/api";


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
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            const chat_id = this.state.chat_id;
            getSingleChatData(chat_id)
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        chatData: responseJson
                    });

                })
                .catch((error) => {
                    console.log(error);
                });
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSendMessage = async () => {
        let to_send = {
            message: this.state.newMessage
        }
        const chat_id = this.state.chat_id;
        sendChatMessage(chat_id, to_send)
            .then((responseJson) => {
                getSingleChatData(chat_id)
                    .then((responseJson) => {
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
            console.log(this.state.chatData)
            return (
                <ScrollView style={styles.container}>

                    <View style={styles.chatName}>
                        <Text style={styles.chatNameText}>{this.state.chatData.name}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backBtn}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DraftMessages", { chat_id: this.state.chat_id})} style={styles.backBtn}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Draft a Message</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatDetails", { chat_id: this.state.chat_id, chatData: this.state.chatData })} style={styles.detailsBtn}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Details</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <MessageList messages={this.state.chatData.messages} chat_id={this.state.chat_id} navigation={this.props.navigation} />
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

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    backBtn: {
        marginLeft: 10,
        width: '30%',
    },
    detailsBtn: {
        marginRight: 10,
        width: '30%',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
    },
    chatName: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'center',
    },
    chatNameText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 16,
        textAlign: 'center',
        fontWeight: 'bold'
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
    sendButtonText: {

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
