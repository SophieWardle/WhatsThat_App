import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

//API
import { updateChatDetails } from '../api/ChatManagement';
//styles
import styles from '../styles/globalTheme';
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
        updateChatDetails(this.state.chat_id, to_send)
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
            <View style={styles.backgroundContainer}>
                <View style={styles.updateChatForm}>
                    <Text style={styles.formHeader}>Enter a new chat name</Text>

                    <TextInput
                        style={styles.formInput}
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
            </View>
        );
    }
}


export default ChatDetailsUpdateScreen;