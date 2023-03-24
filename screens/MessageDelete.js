import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

//API
import { deleteChatMessage } from "../api/api";
export default class MessageDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message_id: this.props.route.params.message_id,
            chat_id: this.props.route.params.chat_id
        };
        console.log("Message id delete:" + this.state.message_id + "chat_id delete:" + this.state.chat_id)
    }

    handleDelete = async (chat_id, message_id) =>  {
        console.log(chat_id,message_id);
        deleteChatMessage(chat_id, message_id)
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
              isLoading: false,
              chats: responseJson
            });
            this.props.navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
    }

    
    render() {
        const {message_id, chat_id} = this.state;
        return (
            <View>
                <Text>Are you sure you want to delete the message?</Text>
                <View style={styles.noBtn}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NO</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.yesBtn}>
                    <TouchableOpacity onPress={() => this.handleDelete(chat_id,message_id)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>YES</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    contactsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    contactsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    searchFormBtn: {
        textAlign: "center"
    }

})