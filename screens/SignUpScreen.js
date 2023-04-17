import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput,} from 'react-native';
import { TouchableOpacity } from 'react-native';

import styles from '../styles/globalTheme';
//API
import { signupUser } from '../api/UserManagement';
//My components
import Logo from '../components/Logo';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            submitted: false,
            error: ""
        }
    }

    _validateInputs = () => {
        var validator = require("email-validator");
        const REGEX_PASS = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

        if (!(this.state.email && this.state.password && this.state.firstname && this.state.lastname && this.state.confirmPassword)) {
            return "Must fill in all fields";
        }

        if (!validator.validate(this.state.email)) {
            return "Must enter valid email";
        }

        if (!REGEX_PASS.test(this.state.password)) {
            return "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long";
        }

        if (this.state.password !== this.state.confirmPassword) {
            return "Passwords must match!";
        }

    }

    _onPressSignup = async () => {
        const error = this._validateInputs();
        if (error) {
            this.setState({ error });
            return;
        }

        this.setState({ submitted: true })

        //SEND TO SERVER
        let to_send = {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        };

        signupUser(to_send)
            .then((rJson) => {
                console.log(rJson)
                this.setState({ "error": "User added successfully" })
                this.setState({ "submitted": false })
                this.props.navigation.navigate("Login")
            })
            .catch((error) => {
                this.setState({ "error": error })
                this.setState({ "submitted": false });
            })
    }

    render() {
        return (
            <View style={styles.backgroundContainer}>
                <View style={styles.signupContainer}>
                    <Logo></Logo>
                    <Text style={styles.formHeader}>First name:</Text>
                    <TextInput
                        style={styles.formInput}
                        value={this.state.firstname}
                        onChangeText={(firstname) => this.setState({ firstname })}
                    />
                    <Text style={styles.formHeader}>Last name:</Text>
                    <TextInput
                        style={styles.formInput}
                        value={this.state.lastname}
                        onChangeText={(lastname) => this.setState({ lastname })}
                    />
                    <Text style={styles.formHeader}>Email:</Text>
                    <TextInput
                        style={styles.formInput}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <Text style={styles.formHeader}>Password:</Text>
                    <TextInput
                        style={styles.formInput}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <Text style={styles.formHeader}>Confirm Password:</Text>
                    <TextInput
                        style={styles.formInput}
                        secureTextEntry={true}
                        value={this.state.confirmPassword}
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    />
                    <Text style={styles.errorMessage}>{this.state.error}</Text>
                    <View style={styles.signupBtn}>
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
            </View>

        );
    }
}

export default SignUpScreen;