import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

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

  _onPressButton = () => {
    var validator = require("email-validator");
    this.setState({ submitted: true })
    this.setState({ error: "" })

    if (!(this.state.email || this.state.password)) {
      this.setState({ error: "Email and password required" })
      return;
    }

    if (!validator.validate(this.state.email)) {
      this.setState({ error: "Must enter valid email" })
      return;
    }

    const REGEX_PASS = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    if (!REGEX_PASS.test(this.state.password)) {
      this.setState({ error: "Password isn't strong enough (One upper, one lower, one special, one number, at least 8 characters long" })
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
        if (response.status === 200) {
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'MainNav' }]
          });
          return response.json();
        } else if (response.status === 400) {
          throw "Incorrect"
        } else {
          throw "Something went wrong"
        }
      })
      .then((rJson) => {
        console.log(rJson)
        const { token, id } = rJson;
        AsyncStorage.setItem('whatsthat_session_token', token);
        AsyncStorage.setItem('id', id.toString());
        this.setState({ "error": "Signed in successfully" })
        this.setState({ "submitted": false })
        this.props.navigation.navigate("MainNav")
      })
      .catch((error) => {
        console.log(error);
        this.setState({ "error": error })
        this.setState({ "submitted": false });
      })
  }

  render() {
    return (
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
    );
  };
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7D6E0'
  },
  input: {
    height: 40,
    width: '70%',
    borderWidth: 2,
    borderColor: 'black',
    
  },
  error: {
    color: 'red'
  },
  header: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loginbtn: {
    marginTop: 10,
  },
  signupbtn: {
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(to right, #C56CD6, #342E37)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default LoginScreen;

