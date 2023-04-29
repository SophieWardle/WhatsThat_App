import React, { Component } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

//API
import { getBlockedUsers } from '../api/ContactManagement';
//My Components
import BlockedList from "../components/BlockedList";

export default class ContactsBlockedScreen extends Component {
	constructor(props) {
		super(props);


		this.state = {
			isLoading: true,
			blockedData: [] || props.route.params.contactData,
			error: "",
		};
	}

	componentDidMount() {
		getBlockedUsers()
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({
					isLoading: false,
					blockedData: responseJson
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View>
					<ActivityIndicator />
				</View>
			);
		} else {

			return (
				<View style={styles.contactsContainer}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate("ContactsScreen")} style={styles.backBtn}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>Back</Text>
							</View>
						</TouchableOpacity>
					</View>
					{this.state.blockedData.length > 0 ? (
						<BlockedList blockedContact={this.state.blockedData} navigation={this.props.navigation} />
					) : (
						<Text style={styles.emptyText}>You Haven't Blocked Anyone.</Text>
					)}
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	contactsContainer: {
		flex: 1,
		backgroundColor: '#f0ece3',
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	contactsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 8,
	},
	buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
	button: {
		backgroundColor: '#bbb5a7',
        borderRadius: 5,
        padding: 10,
	},
	backBtn: {
		marginLeft: 10,
        width: '40%',
	},
	buttonText: {
		color: 'black',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
	},
	emptyText: {
		fontSize: 18,
		textAlign: 'center',
		marginTop: 16,
	},

})