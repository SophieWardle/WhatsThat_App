import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default class ContactsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            contactData: [],
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

    showSearchForm() {
        this.setState({ showSearchForm: true });
    }

    hideSearchForm() {
        this.setState({ showSearchForm: false });
    }

    hideResults() {
        this.setState({ showResults: false })
        this.setState({ showSearchForm: false })
        this.getContactData;
    }


    componentDidMount() {
        this.getContactData();
    }

    componentDidUpdate(contactData){
        console.log("changed");
    }

    async getContactData() {
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch("http://localhost:3333/api/1.0.0/contacts", {
            method: 'GET',
            headers: {
                'X-Authorization': token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    contactData: responseJson
                })
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                            <Text style={styles.searchBtn}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.contactData}
                        renderItem={({ item }) => (
                            <View style={styles.contactsRow}>
                                <Text>{item.first_name} {item.last_name}</Text>
                                <View style={styles.deleteBtn}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Delete', { item: item })}>
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>Delete</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={({ id }, index) => id}
                    />
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