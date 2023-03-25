import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-web";
import { getContactProfile } from "../api/api";

import DisplayProfilePicture from "../components/DisplayProfilePicture";
//API
import { getContactProfilePic } from "../api/api";

export default class ContactProfileScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            id: props.route.params.id,
            contactProfile: []
        }
    }

    componentDidMount() {
        getContactProfile(this.state.id)
         .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                isLoading: false,
                contactProfile: responseJson,
            });
            this.handleFetchPicture(this.state.id);
         })
         .catch((error) => {
            console.log(error);
         })
    }

    
    handleFetchPicture = async (user_id) => {
        try {
          if (this.state.photo) {
            // Use cached photo data if it exists
            return this.state.photo;
          }
          const photo = await getContactProfilePic(user_id);
          // Cache the photo data in component state
          this.setState({ photo: photo }, () => {
            console.log("logging the photo in handleFetch: "+ this.state.photo);
          });
          return photo;
        } catch (error) {
          console.log(error);
        }
      }
      

    render() {
        const { isLoading, contactProfile } = this.state;
        if (isLoading){
            return (
                <View>
                    <ActivityIndicator/>
                </View>
            )
        }else {
            return (
                <View style={styles.contactsProfile}>
                     <View style={styles.backBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <DisplayProfilePicture photo={this.state.photo}/>
                    <Text>{contactProfile.first_name} {contactProfile.last_name}</Text>
                    <Text>{contactProfile.email}</Text>
                    <View style={styles.deleteBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Delete", { item: contactProfile, navigation: navigation })}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blockBtn}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Block", { item: contactProfile, navigation: navigation })}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Block</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        
    }
}

const styles = StyleSheet.create({

});