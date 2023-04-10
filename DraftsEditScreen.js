import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

//API


class DraftsEditScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draft_id: props.route.params.draft_id,
            message: props.route.params.message,
            newMessage: "",
            error: ""
        }
        console.log("draft update screen" + this.state.draft_id)
    }

    handleEditDraft = async () => {
        try {
            const { message, draft_id } = this.state;
            console.log("newMessage value: " + message);
            console.log("draft_id value: " + draft_id);
    
            // Update the draft message in AsyncStorage
            const drafts = await AsyncStorage.getItem('draftMessagesKey'); // Update the key here
            let updatedDrafts = JSON.parse(drafts) || [];
            console.log("draftsArray: " + JSON.stringify(updatedDrafts));
    
            // Find the index of the draft to be updated
            const draftIndex = updatedDrafts.findIndex(draft => draft.draft_id === draft_id);
            console.log("draft index: " + draftIndex);
            // Update the message of the draft in the updatedDrafts array
            if (draftIndex > -1) {
                updatedDrafts[draftIndex].message = message;
            }
    
            // Save the updated drafts array back to AsyncStorage
            await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(updatedDrafts)); // Update the key here
            console.log("updated drafts:" + JSON.stringify(updatedDrafts));
            // Optionally, you can show a success message to the user
            console.log('Draft updated successfully');
    
            // Navigate back to the previous screen
            this.props.navigation.navigate('Drafts');
        } catch (error) {
            // Handle error
            console.error('Error updating draft:', error);
            this.setState({ error: 'Error updating draft' });
        }
    }
    
    
messageHandler = (newMessage) => {
    this.setState({ message: newMessage});
};

render() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your message:</Text>
            <TextInput
                style={styles.input}
                value={this.state.message}
                onChangeText={this.messageHandler}
            />
            <Text style={styles.errorMessage}>{this.state.error}</Text>
            <TouchableOpacity onPress={this.handleEditDraft}>
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

export default DraftsEditScreen;