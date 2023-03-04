import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native';

class LoginScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: "",
            submitted: false
        }
    }

    _onPressButton = () => {
        var validator = require("email-validator");
        this.setState({submitted: true})
        this.setState({error: ""})

        if(!(this.state.email || this.state.password)){
            this.setState({error: "Email and password required"})
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

        //SEND TO SERVER
        let to_send = {
            email: this.state.email,
            password: this.state.password
        };

        return fetch("http://localhost:3333/api/1.0.0/login", {
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
                throw "Incorrect"
            }else{
                throw "Something went wrong"
            }
        })
        .then((rJson) => {
            console.log(rJson)
            this.setState({"error": "Signed in successfully"})
            this.setState({"submitted": false})
            this.props.navigation.navigate("Contacts")
        })
        .catch((error) => {
            this.setState({"error": error})
            this.setState({"submitted": false});
        })
    }

    render(){
        return (
            <View style={styles.login}>
            <Text style={styles.header}>Email:</Text>
            <TextInput 
              style={styles.input} 
              value={this.state.email} 
              onChangeText={(email) => this.setState({email})}
            />
            <Text style={styles.header}>Password:</Text>
            <TextInput 
              style={styles.input} 
              secureTextEntry={true} 
              value={this.state.password} 
              onChangeText={(password) => this.setState({password})}
            />
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            <Text style={styles.successMessage}>{this.state.successMessage}</Text>
            <View style={styles.loginbtn}>
              <TouchableOpacity onPress={this._onPressButton}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.signupbtn}>
              <TouchableOpacity onPress={this.props.navigation.navigate('SignUp')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Need an account? Click here</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
    };
}

const styles = StyleSheet.create({
    login: {
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
    successMessage: {
      color: 'green'
    },
    errorMessage: {
      color: 'red'
    },
    header: {
      
    }
  });

  export default LoginScreen;

