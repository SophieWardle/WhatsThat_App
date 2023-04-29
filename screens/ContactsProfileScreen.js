import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

//My Components
import DisplayProfilePicture from "../components/DisplayProfilePicture";
//API
import { getContactProfile } from "../api/ContactManagement";
import { getContactProfilePic } from '../api/api';

export default class ContactProfileScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			id: props.route.params.id,
			contactProfile: []
		}
	}

	componentDidMount() {
		getContactProfile(this.state.id)
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					isLoading: false,
					contactProfile: responseJson,
				});
				this.handleFetchPicture(this.state.id);
			})
			.catch((error) => {
				console.log(error);
			})
	}


	handleFetchPicture = async (user_id) => {
		try {
			if (this.state.photo) {
				// Use cached photo data if it exists
				return this.state.photo;
			}
			const photo = await getContactProfilePic(user_id);
			// Cache the photo data in component state
			this.setState({ photo: photo }, () => {
				console.log("logging the photo in handleFetch: " + this.state.photo);
			});
			return photo;
		} catch (error) {
			console.log(error);
		}
	}


	render() {
		const { isLoading, contactProfile } = this.state;
		if (isLoading) {
			return (
				<View>
					<ActivityIndicator />
				</View>
			)
		} else {
			return (
				<View style={styles.contactsProfileContainer}>
					<View style={styles.backBtn}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Back</Text>
							</View>
						</TouchableOpacity>
					</View>
					<DisplayProfilePicture photo={this.state.photo} style={styles.profilePicture} />
					<Text style={styles.name}>{contactProfile.first_name} {contactProfile.last_name}</Text>
					<Text style={styles.email}>{contactProfile.email}</Text>

					<View style={styles.deleteBtn}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate("Delete", { item: contactProfile, navigation: navigation })}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Delete</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.blockBtn}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate("Block", { item: contactProfile, navigation: navigation })}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Block</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			);
		}

	}
}

const styles = StyleSheet.create({
	contactsProfileContainer: {
		margin: 5,
		backgroundColor: '#f0ece3',
		flex: 1,
		justifyContent: 'center'
	},
	deleteBtn: {
		marginHorizontal: 10,
		marginVertical: 20,
	},
	blockBtn: {
		marginHorizontal: 10,
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#428bca',
		borderRadius: 5,
		padding: 10
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold'
	},
	profilePicture: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 20
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		paddingLeft: 10
	},
	email: {
		fontSize: 18,
		color: '#666',
		marginBottom: 20,
		paddingLeft: 10
	}
});
