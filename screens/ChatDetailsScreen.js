import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import ChatDetails from "../components/ChatDetails";
//API
import { getSingleChatData } from "../api/api";

export default class ChatDetailsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            chatDetails: this.props.route.params.chatData,
            chat_id: this.props.route.params.chat_id,
            creator: "",
            members: []
        };
        console.log("Chat_id: " + this.state.chat_id)
        console.log("ChatData: " + this.state.chatDetails)
        console.log("Chat Name: " + this.state.chatDetails.name)
        console.log("Members:"+ 
        this.state.chatDetails.members.map((member) => {
            console.log(member.first_name, member.last_name, member.email);
        }));
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            getSingleChatData(this.state.chat_id)
            .then((responseJson) => {
                this.setState({
                    chatDetails: responseJson,
                    members: responseJson.members,
                    creator: responseJson.creator,
                    isLoading: false
                })
                console.log("Members mount func" + responseJson.members);
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
                <View>
                    <ChatDetails chatData={this.state.chatDetails} navigation={this.props.navigation} members={this.state.members} chat_id={this.state.chat_id} />
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

});