import React, { Component } from "react";
import { ActivityIndicator, View, Text, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native";

//API
import { getBlockedUsers } from '../api/ContactManagement';
//My Components
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
                    {this.state.blockedData.length > 0 ? (
                        <BlockedList blockedContact={this.state.blockedData} navigation={this.props.navigation}/>
                    ) : (
                        <Text style={styles.emptyText}>No Blocked Contacts</Text>
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
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },

})