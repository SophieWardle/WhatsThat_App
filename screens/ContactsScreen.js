import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

import ContactList from "../components/ContactList";
//API
import { getContactData } from "../api/api";

export default class ContactsScreen extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoading: true,
            contactData: [] || props.route.params.contactData,
            prevData: [],
            searchData: [],
            q: "",
            search_in: "all",
            showSearchForm: false,
            addError: "",
            error: "",
            showResults: false
        };
    }

    componentDidMount() {
        getContactData()
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    contactData: responseJson
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
                    <View style={styles.searchFormBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', { getContactData: this.getContactData })}>
                            <Text style={styles.searchBtn}>Search</Text>
                        </TouchableOpacity>
                    </View>                        
                    <ContactList contacts={this.state.contactData} navigation={navigation}/>
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