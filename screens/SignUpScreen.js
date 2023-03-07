import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

class SignUpScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            submitted: false
        }
    }
    _onPressSignup = () => {
        var validator = require("email-validator");
        this.setState({error: ""})

        if(!(this.state.email || this.state.password || this.state.firstname || this.state.lastname || this.state.confirmPassword)){
            this.setState({error: "Must fill in all fields"})
            return;
        }

        if(!validator.validate(this.state.email)){
            this.setState({error: "Must enter valid email"})
            return;
        }

        const REGEX_PASS = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        if(!REGEX_PASS.test(this.state.password)){
            this.setState({error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long"})
            return;
        }
        this.setState({submitted: true})

        //SEND TO SERVER
        let to_send = {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        };

        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(to_send)
        })
        .then((response) => {
            if(response.status === 201){
                return response.json;
            }else if(response.status === 400){
                throw "Email exists or password isn't strong enough"
            }else{
                throw "Something went wrong"
            }
        })
        .then((rJson) => {
            console.log(rJson)
            this.setState({"error": "User added successfully"})
            this.setState({"submitted": false})
            this.props.navigation.navigate("Login")
        })
        .catch((error) => {
            this.setState({"error": error})
            this.setState({"submitted": false});
        })
        }
        
    

    render(){
        return (
            <View style={styles.signup}>
                <Text>First name:</Text>
                <TextInput 
                    style={styles.input} 
                    value={this.state.firstname} 
                    onChangeText={(firstname) => this.setState({ firstname })} 
                />
                <Text>Last name:</Text>
                <TextInput 
                    style={styles.input} 
                    value={this.state.lastname} 
                    onChangeText={(lastname) => this.setState({ lastname })} 
                />
                <Text>Email:</Text>
                <TextInput 
                    style={styles.input} 
                    value={this.state.email} 
                    onChangeText={(email) => this.setState({ email })} 
                />
                <Text>Password:</Text>
                <TextInput 
                    style={styles.input} 
                    secureTextEntry={true} 
                    value={this.state.password} 
                    onChangeText={(password) => this.setState({ password })} 
                />
                <Text>Confirm Password:</Text>
                <TextInput 
                    style={styles.input} 
                    secureTextEntry={true} 
                    value={this.state.confirmPassword} 
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })} 
                />
                <Text style={styles.errorMessage}>{this.state.error}</Text>
                <View style={styles.signupbtn}>
                    <TouchableOpacity onPress={this._onPressSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.backBtn}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    signup: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D2B4DE'
    },
    input: {
      height: 40,
      width: 200,
      borderWidth: 2,
      borderColor: 'black'
    },
});

export default SignUpScreen;