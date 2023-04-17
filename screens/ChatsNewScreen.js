import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

//API
import { sendChatMessage, createNewChat } from '../api/ChatManagement';
//Styles
import styles from '../styles/globalTheme';

class ChatsNewScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatName: "",
            initialMessageForm: false,
            message: ""
        }
    }

    async onCreateNewChat() {
        this.setState({ error: "" })

        if (!(this.state.chatName)) {
            this.setState({ error: "Must enter a chat name" })
            return;
        }

        this.setState({ submitted: true })

        //SEND TO SERVER
        let to_send = {
            name: this.state.chatName
        };

        console.log(JSON.stringify(to_send));

        const token = await AsyncStorage.getItem('whatsthat_session_token');

        createNewChat(to_send)
            .then((rJson) => {
                this.setState({ "error": "Chat added successfully" })
                this.setState({ "submitted": false })
                this.setState({ "initialMessageForm": true })
            })
            .catch((error) => {
                this.setState({ "error": error })
                this.setState({ "submitted": false });
            })
    }

    async onSendMessage() {
        if (!(this.state.message)) {
            this.setState({ error: "Must enter a message" })
            return;
        }

        this.setState({ submitted: true })

        //SEND TO SERVER
        let to_send = {
            message: this.state.message
        };

        console.log(JSON.stringify(to_send));
        const chat_id = await AsyncStorage.getItem('chat_id');
        sendChatMessage(chat_id, to_send)
            .then((rJson) => {
                console.log(rJson)
                this.setState({ "error": "Message sent successfully" })
                this.setState({ "submitted": false })
                this.setState({ "initialMessageForm": false })
                this.props.navigation.navigate("ChatsScreen")
            })
            .catch((error) => {
                this.setState({ "error": error })
                this.setState({ "submitted": false });
            })
    }

    render() {
        if (this.state.initialMessageForm === true) {
            return (
                <View style={styles.backgroundContainer}>
                    <View style={styles.chatNewContainer}>
                        <Text styles={styles.formHeader}>Enter your first message:</Text>
                        <TextInput
                            style={styles.formInput}
                            value={this.state.message}
                            onChangeText={(message) => this.setState({ message })}
                        />
                        <View style={styles.sendBtn}>
                            <TouchableOpacity onPress={() => this.onSendMessage()}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>SEND</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.backgroundContainer}>
                    <View style={styles.chatNewContainer}>
                        <Text styles={styles.formHeader}>Enter a chat name:</Text>
                        <TextInput
                            style={styles.formInput}
                            value={this.state.chatName}
                            onChangeText={(chatName) => this.setState({ chatName })}
                        />
                        <View style={styles.createBtn}>
                            <TouchableOpacity onPress={() => this.onCreateNewChat()}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Create New Chat</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.createBtn}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )

        }
    }
}

export default ChatsNewScreen;