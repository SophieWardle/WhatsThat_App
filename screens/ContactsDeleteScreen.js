import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

export default class ContactsDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        const user_id  = this.props.route.params.item.user_id;
        const first_name  = this.props.route.params.item.first_name;
        const last_name  = this.props.route.params.item.last_name;

      }
      
    

    async handleDelete(user_id) {
        const deleteId = user_id;
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        return fetch(`http://localhost:3333/api/1.0.0/user/${deleteId}/contact`, {
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
                    this.props.navigation.navigate("ContactsScreen");
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

        return (
            <View>
                <Text>Are you sure you want to delete {this.props.route.params.item.first_name} {this.props.route.params.item.last_name}?</Text>
                <View style={styles.noBtn}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NO</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.yesBtn}>
                    <TouchableOpacity onPress={() => this.handleDelete(this.props.route.params.item.user_id)}>
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