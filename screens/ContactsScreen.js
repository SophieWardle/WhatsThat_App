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

    async onPressSearch() {

        if (!(this.state.q)) {
            this.setState({ error: "Must fill search field" })
            return;
        }

        const to_send = {
            q: this.state.q,
            search_in: this.state.search_in
        };

        const query = Object.keys(to_send)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(to_send[key]))
            .join("&");

        console.log(query);
        const url = `http://localhost:3333/api/1.0.0/search?${query}`;
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch(url, {
            method: 'GET',
            headers: {
                'X-Authorization': token,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    resultsData: responseJson,
                    showResults: true,
                    q: ""
                })
            })
            .catch((error) => {
                console.log(error);
            });
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

    async addContact(user_id) {
        const queryId = user_id;
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch(`http://localhost:3333/api/1.0.0/user/${queryId}/contact`, {
            method: 'POST',
            headers: {
                'X-Authorization': token,
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        showResults: false,
                        showSearchForm: false
                    })
                    this.getContactData();
                } else if (response.status === 400) {
                    throw "You can't add yourself"
                } else if (response.status === 304) {
                    throw "Already a contact"
                }
                else if (response.status === 401) {
                    throw "Unauthorized"
                }
                else if (response.status === 404) {
                    throw "Not Found"
                } else {
                    throw "Server error"
                }
            })
            .catch((error) => {
                this.setState({ addError: error});
            });
    }

    async deleteContact(user_id) {
        const queryId = user_id;
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch(`http://localhost:3333/api/1.0.0/user/${queryId}/contact`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token,
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                    })
                    this.getContactData();
                } else if (response.status === 400) {
                    throw "You can't remove yourself"
                }
                else if (response.status === 401) {
                    throw "Unauthorized"
                }
                else if (response.status === 404) {
                    throw "Not Found"
                } else {
                    throw "Server error"
                }
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
        } else if (!(this.state.showSearchForm)) {
            return (
                <View style={styles.contactsContainer}>
                    <View style={styles.searchFormBtn}>
                        <TouchableOpacity onPress={() => this.showSearchForm()}>
                            <Text style={styles.searchBtn}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.contactData}
                        renderItem={({ item }) => (
                            <View style={styles.contactsRow}>
                                <Text>{item.first_name} {item.last_name}</Text>
                                <View style={styles.deleteBtn}>
                                    <TouchableOpacity onPress={() => this.deleteContact(item.user_id)}>
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
        } else if (this.state.showResults) {
            return (
                <View style={styles.resultsContainer}>
                    <Text style={styles.errorMessage}>{this.state.addError}</Text>
                    <View style={styles.closeBtn}>
                        <TouchableOpacity onPress={() => this.hideResults()}>
                            <Text style={styles.searchBtn}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.resultsData}
                        renderItem={({ item }) => (
                            <View style={styles.contactsRow}>
                                <Text>{item.given_name} {item.family_name}</Text>
                                <View style={styles.addBtn}>
                                    <TouchableOpacity onPress={() => this.addContact(item.user_id)}>
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>Add</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={({ id }, index) => id}
                    />
                </View>
            )
        }
        else {
            return (
                <View style={styles.searchContainer}>
                    <Text style={styles.header}>Search:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.q}
                        onChangeText={q => this.setState({ q: q })}
                    />
                    <Text style={styles.header}>Search in:</Text>
                    <Picker
                        selectedValue={this.search_in}
                        onValueChange={(itemValue, itemIndex) => this.setState({ search_in: itemValue })}
                    >
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Contacts" value="contacts" />
                    </Picker>
                    <Text style={styles.errorMessage}>{this.state.error}</Text>
                    <View style={styles.searchBtn}>
                        <TouchableOpacity onPress={() => this.onPressSearch()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Search</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.closeBtn}>
                        <TouchableOpacity onPress={() => this.hideSearchForm()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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