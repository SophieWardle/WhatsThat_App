import React, { Component } from "react";
import { View, ActivityIndicator, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from '../styles/globalTheme';
import ChatList from "../components/ChatList";

//API
import { getChatListData } from '../api/ChatManagement';

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

    componentWillUnmount() {
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
                <ScrollView style={styles.backgroundContainer}>
                    <Text style={styles.pageHeader}>
                            My Chats
                    </Text>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewChat')}>
                            <View style={styles.chatsButton}>
                                <Text style={styles.chatsBtnText}>Create a New Chat</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Drafts')}>
                            <View style={styles.chatsButton}>
                                <Text style={styles.chatsBtnText}>My Drafts</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ChatList chats={this.state.chats} navigation={this.props.navigation} />
                </ScrollView>

            );
        }
    }
}
