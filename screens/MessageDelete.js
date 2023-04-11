import React, { Component } from "react";
import { View} from "react-native";
//API
import { deleteChatMessage } from "../api/api";
//MY COMPONENTS
import ConfirmTask from "../components/ConfirmTask";
//STYLES
import styles from '../styles/globalTheme';

export default class MessageDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message_id: this.props.route.params.message_id,
            chat_id: this.props.route.params.chat_id
        };
        console.log("Message id delete:" + this.state.message_id + "chat_id delete:" + this.state.chat_id)
    }

    handleCancel = () => {
        this.props.navigation.goBack();
    };

    handleConfirm = () => {
        this.handleDelete();
    };

    async handleDelete()  {
        const {chat_id, message_id} = this.state;
        console.log(chat_id,message_id);
        deleteChatMessage(chat_id, message_id)
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
              isLoading: false,
              chats: responseJson
            });
            this.props.navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {
        const {message_id, chat_id} = this.state;
        return (
            <View style={styles.backgroundContainer}>
                <ConfirmTask
                    message="delete this message"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </View>
        );
    }
}
