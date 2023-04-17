import React, { Component } from "react";
import { View, Text } from "react-native";
//API
import { unblockContact } from "../api/ContactManagement";
//MY COMPONENTS
import ConfirmTask from "../components/ConfirmTask";
//STYLES
import styles from '../styles/globalTheme';

export default class ContactsUnblockScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.route.params.item.user_id,
            first_name: this.props.route.params.item.first_name,
            last_name: this.props.route.params.item.last_name,
        };

        this.handleUnblock = this.handleUnblock.bind(this)
    }

    handleCancel = () => {
        this.props.navigation.goBack();
    };

    handleConfirm = () => {
        this.handleUnblock();
    };

    handleUnblock = async () => {
        const contact_id = this.state.user_id;
        console.log(contact_id);
        unblockContact(contact_id)
            .then(async (response) => {
                this.props.navigation.navigate("ContactsScreen");
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { user_id, first_name, last_name } = this.state;
        return (
            <View style={styles.backgroundContainer}>
                <Text> You are trying to unblock: </Text>
                <Text> {first_name} {last_name} </Text>
                <ConfirmTask
                    message="unblock this user"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </View>
        );
    }
}

