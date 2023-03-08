import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, TextInput, StyleSheet, Button } from "react-native";


export default class ChatsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            messages: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        const url = 'http://localhost:3333/api/1.0.0/chat'
        return fetch(url, {
            method: 'GET',
            headers: {
                'X-Authorization': token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    chatData: responseJson
                })
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
                <View style={styles.container}>
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.chatData.messages}
                            renderItem={({ item }) =>
                                <MessageItem message={item} />
                            }
                            keyExtractor={item => item.message_id.toString()}
                            contentContainerStyle={styles.messagesList}
                        />
                        <View style={styles.userInput}>
                            <TextInput style={styles.sendMessage} placeholder={'Type your message...'}></TextInput>
                            <Button
                                title="SEND"
                            />
                        </View>
                    </View >
                </View >
            );
        }
    }
}

const styles = StyleSheet.create({

})