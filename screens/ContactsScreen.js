import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

import ContactList from "../components/ContactList";

//API
import { getContactList } from "../api/api";

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
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            getContactList()
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    contactData: responseJson
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', { getContactData: this.getContactData })} style={styles.searchBtn}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Search</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('BlockedContacts', { getContactData: this.getContactData })} style={styles.blockedBtn}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Blocked Users</Text>
                            </View>
                        </TouchableOpacity>
                    </View>                  
                    <ContactList contacts={this.state.contactData} navigation={this.props.navigation} handleFetchPicture={this.handleFetchPicture}/>
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
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    searchBtn: {
        marginLeft: 10,
        width: '40%',
    },
    blockedBtn: {
        marginRight: 10,
        width: '40%',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },

})