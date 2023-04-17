import React, { Component } from "react";
import { View, StyleSheet} from "react-native";

//My Components
import ChatAddMemberList from "../components/ChatAddMemberList";

//API
import { getContactList } from "../api/ContactManagement";
import { addUserToChat } from "../api/ChatManagement";

export default class ChatAddMember extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            addContactData: [],
            chat_id: this.props.route.params.chat_id,
            user_id: this.props.route.params.user_id,
            members: this.props.route.params.members
        };
        console.log("members add:" + this.state.members);
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            getContactList()
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    addContactData: responseJson
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

    handleAddUserToChat = async (chat_id, user_id) =>  {
        console.log(chat_id,user_id);
        addUserToChat(chat_id, user_id)
        .then(async (response) => {
            console.log(response);
            this.props.navigation.goBack();
            return response;
          })
          .catch((error) => {
            console.log(error);
          });
    }

    handleSelectUser = (user_id) => {
        this.setState({ user_id }, () => {
          this.handleAddUserToChat(this.state.chat_id, user_id);
        });
      };

    render() {
        
            return (
                <View>
                    <ChatAddMemberList 
                      contacts={this.state.addContactData} 
                      chat_id={this.state.chat_id} 
                      members={this.state.members} 
                      onSelectUser={this.handleSelectUser}/>
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