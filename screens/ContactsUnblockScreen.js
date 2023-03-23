import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

//API
import { unblockContact } from "../api/api";
export default class ContactsUnblockScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: this.props.route.params.item.user_id,
            first_name: this.props.route.params.item.first_name,
            last_name: this.props.route.params.item.last_name,
        };
    }

    async handleUnblock() {
        const contact_id = this.state.user_id;
        console.log(contact_id);
        deleteContact(contact_id)
            .then(async (response) => {
                this.props.navigation.navigate("ContactsScreen");
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View>
                <Text>Are you sure you want to unblock {this.props.route.params.item.first_name} {this.props.route.params.item.last_name}?</Text>
                <View style={styles.noBtn}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NO</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.yesBtn}>
                    <TouchableOpacity onPress={() => this.handleUnblock(this.props.route.params.item.user_id)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>YES</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    contactsContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    contactsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    searchFormBtn: {
        textAlign: "center"
    }

})