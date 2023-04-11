import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ActivityIndicator, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";


//Styles
import styles from '../styles/globalTheme';
//API
import { getSingleChatData } from "../api/api";
import { sendChatMessage } from "../api/api";
//My components
import MessageList from "../components/MessageList";
import ChatHeader from "../components/ChatHeader";



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
    handleCancel = () => {
        this.props.navigation.goBack();
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
                <View style={styles.backgroundContainer}>

                    <ChatHeader
                        chatName={this.state.chatData.name}
                        onCancel={this.handleCancel}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("DraftMessages", { chat_id: this.state.chat_id, chat_name: this.state.chatData.name })} style={styles.detailsBtn}>
                            <View style={styles.chatDisplayBtn}>
                                <Text style={styles.buttonText}>Draft a Message</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatDetails", { chat_id: this.state.chat_id, chatData: this.state.chatData })} style={styles.detailsBtn}>
                            <View style={styles.chatDisplayBtn}>
                                <Text style={styles.buttonText}>Details</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <MessageList messages={this.state.chatData.messages} chat_id={this.state.chat_id} navigation={this.props.navigation} />
                    <View style={styles.sendMessage}>
                        <TextInput
                            style={styles.chatInput}
                            value={this.state.newMessage}
                            onChangeText={(newMessage) => this.setState({ newMessage })}
                        />
                        <TouchableOpacity onPress={() => this.handleSendMessage()}>
                            <View style={styles.sendButton}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View >
            );
        }
    }
}

