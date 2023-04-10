import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//API
import { sendChatMessage } from './api/api';
class DraftsDisplayScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat_id: props.route.params.chat_id,
            draft_id: props.route.params.draft_id,
            chat_name: props.route.params.chat_name,
            message: props.route.params.message
        };
    }

    handleSendDraft = async () => {
        let to_send = {
            message: this.state.message
        }

        const chat_id = this.state.chat_id;
        const draft_id = this.state.draft_id;
        sendChatMessage(chat_id, to_send)
            .then(async(responseJson) => {
                await this.handleDeleteDraft(draft_id);
                this.props.navigation.navigate('Drafts');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleDeleteDraft = async (draft_id) => {
        const currentDrafts = await AsyncStorage.getItem('draftMessagesKey');
        
        let draftArray = JSON.parse(currentDrafts) || [];
        
        //find index of draft w/matching id
        const itemIndexToRemove = draftArray.findIndex(item => item.draft_id === draft_id )
        if(itemIndexToRemove !== -1){
            //remove draft
            draftArray.splice(itemIndexToRemove, 1);

            //store updated array
            await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftArray))
            this.props.navigation.navigate('Drafts');
        }
    }


render() {
    const { chat_name, message, draft_id } = this.state;
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}> {/* Update the event handler */}
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.draftContainer}>
                <Text style={styles.draftTitle}>{chat_name}</Text>
                <Text style={styles.draftContent}>{message}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DraftsEdit", {message: message, draft_id: draft_id})}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleDeleteDraft(draft_id)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleSendDraft()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Send</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>

    );
};
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    draftContainer: {
        marginBottom: 16,
    },
    draftTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    draftContent: {
        fontSize: 16,
        color: 'gray',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },
});

export default DraftsDisplayScreen;
