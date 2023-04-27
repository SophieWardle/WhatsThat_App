import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import TimePicker from 'react-time-picker';

export default class DraftSchedulingScreen extends Component {
	constructor(props) {
		super(props);

		const today = new Date();

		const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')

		this.state = {
			draftMessage: this.props.route.params.draftMessage,
			chat_id: this.props.route.params.chat_id,
			chat_name: this.props.route.params.chat_name,
			isScheduled: this.props.route.params.isScheduled,
			error: "",
			selectedDate: new Date(),
			date: false,
			time: '00:00',
			startDate: startDate,
		};

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
	}


	handleDateChange(propDate) {
		this.setState({ date: propDate });
		console.log(propDate);
	}

	handleTimeChange(propTime) {
		this.setState({ time: propTime });
		console.log(propTime);
	}

	handleSaveScheduledDraft = async () => {
		try {
			const { draftMessage, chat_id, chat_name, isScheduled, date, time } = this.state; // Access the state
			console.log("Date: " + date + " Time: " + time);
			//check if time is empty?
			if(!time){
				this.setState({ error: "Please set a time."})
				return;
			}
			//check if date is empty?
			//check if date+time in past?
			if(!date){
				this.setState({ error: "Please set a date."})
				return;
			}

			if(this.state.startDate > date){
				this.setState({ error: "Please pick a valid date, must not have passed."})
				return;
			}
			
			// Retrieve existing draft messages from AsyncStorage
			const jsonString = await AsyncStorage.getItem('draftMessagesKey');
			console.log(jsonString);
			const draftMessages = jsonString ? JSON.parse(jsonString) : [];
			console.log(draftMessages);

			// Find the last used draft_id
			let lastDraftId = 0;
			if (draftMessages.length > 0) {
				const lastDraft = draftMessages[draftMessages.length - 1];
				lastDraftId = lastDraft.draft_id;
			}

			// Generate a new draft_id by adding 1 to the last used draft_id
			const newDraftId = lastDraftId + 1;

			// Add new draft message with the generated draft_id to the draft messages array
			draftMessages.push({ draft_id: newDraftId, message: draftMessage, chat_id: chat_id, chat_name: chat_name, isScheduled: isScheduled, time: time, date: date });

			// Save updated draft messages array in AsyncStorage
			await AsyncStorage.setItem('draftMessagesKey', JSON.stringify(draftMessages));

			// Show success message
			this.setState({ error: 'Draft message saved successfully.' });

			// Clear input field
			this.setState({ draftMessage: '' }); // Update the state
		} catch (error) {
			// Show error message
			this.setState({ error: 'Failed to save draft message. Please try again.' + error });
		}
	}

	render() {
		return (
			<View style={styles.container}>

				<View style={styles.centered}>
					<View style={styles.modal}>

						<DatePicker
							mode='calendar'
							minimumDate={this.state.startDate}
							selected={this.state.date}
							onDateChange={this.handleDateChange}
						/>

						<TimePicker
							onChange={this.handleTimeChange}
							value={this.state.time}
							disableClock={true}
							clearIcon={null}
						/>
					</View>

					<Text style={styles.errorMessage}>{this.state.error}</Text>

					<TouchableOpacity onPress={() => this.handleSaveScheduledDraft()}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Draft</Text>
						</View>
					</TouchableOpacity>

				</View>


			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modal: {
		margin: 20,
		borderRadius: 20,
		width: '90%',
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
})