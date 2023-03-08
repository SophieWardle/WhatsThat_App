import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";


export default class ChatsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        console.log('called');
        return {
            title: 'Chats',
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('NewChat')}>
                    <Text style={{ marginRight: 10 }}>New Chat</Text>
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chatData: []
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
                <View>
                    <Text>Reached Chats</Text>
                </View>
            );
        }
    }
}