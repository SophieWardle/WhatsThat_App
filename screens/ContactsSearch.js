import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

//API
import { searchForUser } from "../api/UserManagement";
import { addContact } from "../api/ContactManagement";

export default class ContactsSearch extends Component {
    constructor(props) {
        super(props);
        this.handleContactData.bind(this);
        const { getContactData } = this.props.route.params;

        this.state = {
            isLoading: false,
            searchData: [],
            q: "",
            search_in: "all",
            showSearchForm: true,
            addError: "",
            error: "",
            showResults: false,
            contactData: []

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
        console.log("mounted");
    }

    handleContactData = (contactData) => {
        //this.props.setStateOfParent(contactData);
        this.props.navigation.navigate("ContactsScreen");
    }


    async onPressSearch() {


        const to_send = {
            q: this.state.q,
            search_in: this.state.search_in
        };

        const query = Object.keys(to_send)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(to_send[key]))
            .join("&");

        console.log(query);

        searchForUser(query)
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


    async addContact(user_id) {
        const queryId = user_id;

        addContact(queryId)
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    showResults: false,
                    showSearchForm: false
                })
                this.props.navigation.navigate('ContactsScreen');
            })
            .catch((error) => {
                this.setState({ addError: error });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            );
        } else if (this.state.showResults) {
            return (
                <View style={styles.resultsContainer}>

                    <Text style={styles.errorMessage}>{this.state.addError}</Text>

                    <View style={styles.closeBtn}>
                        <TouchableOpacity onPress={() => this.hideResults()} style={styles.button}>
                            <Text style={styles.buttonText}>Close</Text>
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
                        <Picker.Item label="All Users" value="all" />
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
                    <View style={styles.backBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ContactsScreen")}>
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
    searchContainer: {
        flex: 1,
        backgroundColor: '#f0ece3',
        padding: 20,
    },
    
    searchFormBtn: {
        textAlign: "center"
    },
    
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white'
    },

    
    resultsContainer: {
        flex: 1,
        backgroundColor: '#f0ece3',
        paddingHorizontal: 16,
        paddingVertical: 8,

    },
    contactsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
      },
    addBtn: {
        borderRadius: 5,
        padding: 1,
    },
    button: {
        backgroundColor: '#bbb5a7',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
    searchBtn: {
        marginTop: 20,
        marginBottom: 10,
    },
    closeBtn: {
        width: '40%',
        borderRadius: 5,
        padding: 5,
        margin: 5,
        top: 2,
        left: 10,
    }

})