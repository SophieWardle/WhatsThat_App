import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Text,Alert, TouchableOpacity, StyleSheet, TextInput, View } from "react-native";


export default class DraftMessagesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat_id: props.route.params.chat_id,
            draftMessage: ""
        };
    }

    handleSaveDraftMessage = async () => {
        try {
            const { draftMessage, chat_id } = this.state; // Access the state

            // Retrieve existing draft messages from AsyncStorage
            const jsonString = await AsyncStorage.getItem('draftMessagesKey');
            const draftMessages = jsonString ? JSON.parse(jsonString) : [];

            // Add new draft message to the draft messages array
            draftMessages.push({ message: draftMessage, chat_id });

            // Save updated draft messages array in AsyncStorage
            await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftMessages));

            // Show success message
            Alert.alert('Success', 'Draft message saved successfully.');

            // Clear input field
            this.setState({ draftMessage: '' }); // Update the state
        } catch (error) {
            // Show error message
            Alert.alert('Error', 'Failed to save draft message. Please try again.');
        }
    }

    render() {
        const { draftMessage } = this.state; // Access the state

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={draftMessage}
                    onChangeText={draftMessage => this.setState({ draftMessage })} // Update the state
                    placeholder="Enter your draft message..."
                    multiline
                />
                <TouchableOpacity onPress={() => this.handleSaveDraftMessage()}> {/* Update the event handler */}
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
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
        padding: 16,
    },
    textInput: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 16,
        padding: 8,
    },
});
