import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet, TextInput, View } from "react-native";


export default class DraftMessagesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat_id: props.route.params.chat_id,
            chat_name: props.route.params.chat_name,
            draftMessage: "",
            error: ""
        }
    }

    handleSaveDraftMessage = async () => {
        try {
            const { draftMessage, chat_id, chat_name} = this.state; // Access the state

            // Retrieve existing draft messages from AsyncStorage
            const jsonString = await AsyncStorage.getItem('draftMessagesKey');
            const draftMessages = jsonString ? JSON.parse(jsonString) : [];

            // Add new draft message to the draft messages array
            draftMessages.push({ message: draftMessage, chat_id, chat_name });

            // Save updated draft messages array in AsyncStorage
            await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftMessages));

            // Show success message
            this.setState({error: 'Draft message saved successfully.'});

            // Clear input field
            this.setState({ draftMessage: '' }); // Update the state
        } catch (error) {
            // Show error message
            this.setState({error: 'Failed to save draft message. Please try again.'});
        }
    }

    render() {
        const { draftMessage, chat_name } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.chatName}>Draft a message for: {this.state.chat_name}</Text>
                <TextInput
                    style={styles.textInput}
                    value={draftMessage}
                    onChangeText={draftMessage => this.setState({ draftMessage })} // Update the state
                    placeholder="Enter your draft message..."
                    multiline
                />
                <Text style={styles.error}>{this.state.error}</Text>
                <TouchableOpacity onPress={() => this.handleSaveDraftMessage()}> {/* Update the event handler */}
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}> {/* Update the event handler */}
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    textInput: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 16,
        padding: 8,
    }
});
