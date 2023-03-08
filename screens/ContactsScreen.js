import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";

export default class ContactsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            contactData: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
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
                <View>
                    <FlatList
                        data={this.state.contactData}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item.first_name}</Text>
                            </View>
                        )}
                        keyExtractor={({ id }, index) => id}
                    />
                </View>
            );
        }
    }
}