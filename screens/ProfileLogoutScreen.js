import React, { Component } from "react";
import { View} from "react-native";
import ConfirmTask from "../components/ConfirmTask";
//API
import { logoutUser } from "../api/UserManagement";
//My styles
import styles from '../styles/globalTheme';

export default class ProfileScreen extends Component {

    async logout() {
        logoutUser()
            .then((response) => {
                this.props.navigation.navigate("Login")
            })
            .catch((error) => {
                this.props.navigation.navigate("Login")
                console.log(error);
            })
    }

    handleCancel = () => {
        this.props.navigation.goBack();
    };

    handleConfirm = () => {
        this.logout();
    };

    render() {
        return (
            <View style={styles.backgroundContainer}>
                <ConfirmTask
                    message="log out"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />

            </View>
        );

    }
}
