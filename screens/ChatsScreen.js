import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

import ChatList from "../components/ChatList";

//API
import { getChatListData } from "../api/api";

export default class ChatsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chats: []
        };
    }
    
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            getChatListData()
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    chats: responseJson
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NewChat')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Create A New Chat</Text>
                        </View>
                    </TouchableOpacity>
                    <ChatList chats={this.state.chats} navigation={this.props.navigation} />
                </ScrollView >
            );
        }
    }
}

const styles = StyleSheet.create({

})