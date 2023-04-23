import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import Sheduling from "./Scheduling";
//styles
import styles from './styles/globalTheme';

export default class DraftMessagesScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chat_id: props.route.params.chat_id,
			chat_name: props.route.params.chat_name,
			draftMessage: "",
			isScheduled: false,
			error: "",
			selectedDate: new Date(),
		}
	}

	handleSaveDraftMessage = async () => {
		try {
			const { draftMessage, chat_id, chat_name, isScheduled } = this.state; // Access the state
			if (isScheduled) {
				console.log("need to schedule");
			} else {
				// Retrieve existing draft messages from AsyncStorage
				const jsonString = await AsyncStorage.getItem('draftMessagesKey');
				const draftMessages = jsonString ? JSON.parse(jsonString) : [];

				// Find the last used draft_id
				let lastDraftId = 0;
				if (draftMessages.length > 0) {
					const lastDraft = draftMessages[draftMessages.length - 1];
					lastDraftId = lastDraft.draft_id;
				}

				// Generate a new draft_id by adding 1 to the last used draft_id
				const newDraftId = lastDraftId + 1;

				// Add new draft message with the generated draft_id to the draft messages array
				draftMessages.push({ draft_id: newDraftId, message: draftMessage, chat_id, chat_name });

				// Save updated draft messages array in AsyncStorage
				await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftMessages));

				// Show success message
				this.setState({ error: 'Draft message saved successfully.' });

				// Clear input field
				this.setState({ draftMessage: '' }); // Update the state
			}
		} catch (error) {
			// Show error message
			this.setState({ error: 'Failed to save draft message. Please try again.' });
		}
	}

	render() {
		const { draftMessage, chat_name, isScheduled } = this.state;
		return (
			<View style={styles.draftMsgContainer}>

				<Text style={styles.formHeader}>Draft a message for: {chat_name}</Text>
				<TextInput
					style={styles.textInput}
					value={draftMessage}
					onChangeText={draftMessage => this.setState({ draftMessage })} // Update the state
					placeholder="Enter your draft message..."
					multiline
				/>

				<Text style={styles.formHeader}>Would you like to schedule this message now?</Text>
				
				<Sheduling></Sheduling>

				<Text style={styles.errorMessage}>{this.state.error}</Text>
				<TouchableOpacity onPress={() => this.handleSaveDraftMessage()}>
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
		)
	};
}

