import React, { Component } from "react";
import { View, Text } from "react-native";
//API
import { blockContact } from '../api/ContactManagement';
//MY COMPONENTS
import ConfirmTask from "../components/ConfirmTask";
//STYLES
import styles from '../styles/globalTheme';

export default class ContactsBlockScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: this.props.route.params.item.user_id,
			first_name: this.props.route.params.item.first_name,
			last_name: this.props.route.params.item.last_name,
		};
	}

	handleCancel = () => {
		this.props.navigation.goBack();
	};

	handleConfirm = () => {
		this.handleBlock();
	};

	async handleBlock() {
		const contact_id = this.state.user_id;
		console.log(contact_id);
		blockContact(contact_id)
			.then(async (response) => {
				this.props.navigation.navigate("ContactsScreen");
				return response;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { first_name, last_name } = this.state;
		return (
			<View style={styles.backgroundContainer}>
				<View style={styles.blockContainer}>
					<Text style={styles.confirmText}> You are trying to block: </Text>
					<Text style={styles.confirmTextName}> {first_name} {last_name} </Text>
				</View>
				<View style={styles.blockConfirmContainer}>
					<ConfirmTask
						message="block this user"
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
					/>
				</View>
			</View>
		);
	}
}