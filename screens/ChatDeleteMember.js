import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

//API
import { removeUserFromChat } from "../api/api";
export default class ChatDeleteMember extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.route.params.user_id,
            chat_id: this.props.route.params.chat_id
        };
        console.log("User id delete:" + this.state.user_id + "chat_id delete:" + this.state.chat_id)
    }

    handleRemoveUser = async (chat_id, user_id) =>  {
        console.log(chat_id,user_id);
        removeUserFromChat(chat_id, user_id)
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
        const {chat_id, user_id} = this.state;
        return (
            <View>
                <Text>Are you sure you want to remove this user?</Text>
                <View style={styles.noBtn}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NO</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.yesBtn}>
                    <TouchableOpacity onPress={() => this.handleRemoveUser(chat_id,user_id)}>
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