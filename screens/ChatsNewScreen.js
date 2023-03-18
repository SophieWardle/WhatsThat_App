import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';



class ChatsNewScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
           chatName: "",
           initialMessageForm: false,
           message: ""
        }
    }
    
    async createNewChat(){
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

        return fetch("http://localhost:3333/api/1.0.0/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(to_send)
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    throw "Bad Request"
                } else {
                    throw "Something went wrong"
                }
            })
            .then((rJson) => {
                console.log(rJson)
                this.setState({ "error": "Chat added successfully" })
                this.setState({ "submitted": false })
                this.setState({ "initialMessageForm": true})
                AsyncStorage.setItem('chat_id', rJson.chat_id.toString());
            })
            .catch((error) => {
                this.setState({ "error": error })
                this.setState({ "submitted": false });
            })
    }

    async sendMessage() {
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

        const token = await AsyncStorage.getItem('whatsthat_session_token');
        const chat_id = await AsyncStorage.getItem('chat_id');
        return fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(to_send)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    throw "Bad Request"
                } else {
                    throw "Something went wrong"
                }
            })
            .then((rJson) => {
                console.log(rJson)
                this.setState({ "error": "Message sent successfully" })
                this.setState({ "submitted": false })
                this.setState({ "initialMessageForm": false})
                this.props.navigation.navigate("ChatsScreen")
            })
            .catch((error) => {
                this.setState({ "error": error })
                this.setState({ "submitted": false });
            })
    }



    render() {
            if (this.state.initialMessageForm === true){
                return ( 
                    <View style={styles.container}>
                    <Text styles={styles.h1}>Enter your first message:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.message}
                        onChangeText={(message) => this.setState({ message })}
                    />
                    <View style={styles.signupbtn}>
                        <TouchableOpacity onPress={() => this.sendMessage()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>SEND</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                )
            }else{
                return (
                    <View style={styles.container}>
                    <Text styles={styles.h1}>Enter a chat name:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.chatName}
                        onChangeText={(chatName) => this.setState({ chatName })}
                    />
                    <View style={styles.signupbtn}>
                        <TouchableOpacity onPress={() => this.createNewChat()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Create New Chat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                )
                
            }
        }
    }


const styles = StyleSheet.create({

});

export default ChatsNewScreen;