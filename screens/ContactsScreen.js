import React, { Component } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
//My Components
import ContactList from "../components/ContactList";
//API
import { getContactList } from '../api/ContactManagement';

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
            console.log("Screen reached");
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
                    {this.state.contactData.length > 0 ? (
                        <ContactList contacts={this.state.contactData} navigation={this.props.navigation} />
                    ) : (
                        <Text style={styles.emptyText}>You Currently Have No Contacts. Try searching for someone.</Text>
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
        backgroundColor: '#bbb5a7',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 16,
    },

})