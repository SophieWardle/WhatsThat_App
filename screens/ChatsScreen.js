import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import moment from "moment/moment";
import ChatItem from "../components/ChatItem";
export default class ChatsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chats: []
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
                    chats: responseJson
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
                    <FlatList
                        data={this.state.chats}
                        renderItem={({ item }) => (
                            <View style={styles.chatContainer}>
                                <View style={styles.chatContent}>
                                    <Text style={styles.chatName}>{item.name}</Text>
                                    <Text style={styles.name}>{item.last_message.author.first_name} {item.last_message.author.last_name}</Text>
                                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.message}>{item.last_message.message}</Text>
                                </View>
                                <Text style={styles.time}>{moment(item.last_message.timestamp * 1000).format('DD/MM/YYYY, h:mm a')}</Text>
                            </View>
                        )}
                        keyExtractor={({ id }, index) => id}
                    />
                </View >
            );
        }
    }
}

const styles = StyleSheet.create({

})