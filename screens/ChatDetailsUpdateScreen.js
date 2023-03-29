import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

//API
import { updateChatDetails } from '../api/api';

class ChatDetailsUpdateScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat_id: props.route.params.chat_id,
            newChatName: "",
            error: ""
        }
        console.log("chat update screen" + this.state.chat_id)
    }

    validateInput() {

        if (this.state.newChatName === "") {
            return "Chat name can't be empty!";
        }
    }

    updateChat = async () => {
        const to_send = {};

        if (this.state.newChatName !== "") {
            to_send.name = this.state.newChatName;
        }
        updateChatDetails(chat_id,to_send)
            .then(() => {
                this.setState({
                    error: 'Name updated!',
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Enter new chat name</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.newChatName}
                    onChangeText={(newChatName) => this.setState({ newChatName })}
                />
                <Text style={styles.errorMessage}>{this.state.error}</Text>
                <TouchableOpacity onPress={this.updateChat}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 200,
        borderWidth: 2,
        borderColor: 'black'
    },
    header: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorMessage: {
        color: 'red'
    },
    signupbtn: {
        marginTop: 10,
        backgroundColor: 'green',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'

    },
    backBtn: {
        marginTop: 10,
        backgroundColor: 'red',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ChatDetailsUpdateScreen;