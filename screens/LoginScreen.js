import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import styles from '../styles/globalTheme';

//API
import { loginUser } from '../api/api';
class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: "",
      submitted: false
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('whatsthat_session_token');
    if (value != null) {
      this.props.navigation.navigate('MainNav');
    }
  };

  _validateInputs = () => {
    var validator = require("email-validator");
    const REGEX_PASS = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

    if (!(this.state.email && this.state.password)) {
      return "Email and password required";
    }

    if (!validator.validate(this.state.email)) {
      return "Must enter valid email";
    }

    if (!REGEX_PASS.test(this.state.password)) {
      return "Password incorrect: isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long";
    }

  }

  _onPressButton = () => {

    const error = this._validateInputs();
    if (error) {
      this.setState({ error });
      return;
    }
    this.setState({ submitted: true })

    //SEND TO SERVER
    let to_send = {
      email: this.state.email,
      password: this.state.password
    };


    loginUser(to_send)
      .then(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainNav' }]
        })
        this.setState({ "error": "" })
        this.setState({ "submitted": false })
        this.props.navigation.navigate("MainNav")
      })
      .catch((error) => {
        console.log(error);
        this.setState({ "error": error })
        this.setState({ "submitted": false });
      });
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>

        <View style={styles.login}>
          <Text style={styles.header}>Email:</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <Text style={styles.header}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <Text style={styles.error}>{this.state.error}</Text>
          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={this._onPressButton}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.signupbtn}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Need an account? Click here</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };
}

export default LoginScreen;

