import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

//API
import { updateChatMessage } from "../api/ChatManagement";
export default class MessageUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.route.params.message,
            message_id: this.props.route.params.message_id,
            chat_id: this.props.route.params.chat_id
        };
        console.log("Message id update:" + this.state.message_id + "chat_id update:" + this.state.chat_id)
    }

    handleUpdate = async (chat_id, message_id) =>  {
        const to_send = {};

        if (this.state.message !== ""){
            to_send.message = this.state.message;
        }
        //TO SEND


        console.log(chat_id,message_id);
        updateChatMessage(chat_id, message_id, to_send)
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
              isLoading: false,
              error: "updated message success"
            });
            this.props.navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
    }

    messageHandler = (msg) => {
        this.setState({ message: msg});
    }
    
    render() {
        return (
            <View>
                <TextInput
                  value={this.state.message} 
                  onChangeText={this.messageHandler}
                />
                 <Text style={styles.errorMessage}>{this.state.error}</Text>
                    <TouchableOpacity onPress={() => this.handleUpdate(this.state.chat_id, this.state.message_id)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Update Message</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
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
    

})