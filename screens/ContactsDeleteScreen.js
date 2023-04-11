import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
//API
import { deleteContact } from "../api/api";
//MY COMPONENTS
import ConfirmTask from "../components/ConfirmTask";
//STYLES
import styles from '../styles/globalTheme';

export default class ContactsDelete extends Component {
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
        this.handleDelete();
    };

    async handleDelete() {
        const user_id = this.state.user_id;
        console.log(user_id);
        deleteContact(user_id)
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
                <Text> You are trying to delete: </Text>
                <Text> {first_name} {last_name} </Text>
                <ConfirmTask
                    message="delete this user"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </View>
        );
    }
}

