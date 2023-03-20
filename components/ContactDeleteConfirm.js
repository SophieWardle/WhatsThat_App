import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

//API
import { deleteContact } from "../api/api";


const ContactDeleteConfirm = ({contact, navigation}) => {
    return (
        <View>
                <Text>Are you sure you want to delete {contact.first_name} {contact.last_name}?</Text>
                <View style={styles.noBtn}>
                    <TouchableOpacity onPress={() => navigation.navigate.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>NO</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.yesBtn}>
                    <TouchableOpacity onPress={() => this.handleDelete(contact.user_id)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>YES</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

    )
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