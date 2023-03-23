import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

import ContactList from "../components/ContactList";
//API
import { getBlockedUsers } from "../api/api";
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
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ContactsScreen")}>
                            <Text style={styles.searchBtn}>Back</Text>
                        </TouchableOpacity>
                    </View>                   
                    <BlockedList contacts={this.state.blockedData} navigation={this.props.navigation}/>
                </View>
            );
        }
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