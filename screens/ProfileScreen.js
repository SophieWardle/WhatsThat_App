import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, Button, View } from "react-native";
import { FlatList } from "react-native-web";

export default class ChatsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            profileData: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch("http://localhost:3333/api/1.0.0/chat", {
            method: 'GET',
            headers: {
                'X-Authorization': token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                contactData: responseJson
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
                <View>
                    <Text>Reached Chats</Text>
                </View>
            );
        }
    }
}