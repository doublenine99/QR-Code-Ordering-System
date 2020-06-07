import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

export var loggedUser;
export default class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  componentDidMount() {
    const { navigate } = this.props.navigation;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loggedUser = firebase.auth().currentUser;
        navigate('Main');
      }
    })
  }

  handleSignIn() {
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => { loggedUser = firebase.auth().currentUser })
      .then(() => this.props.navigation.navigate('Main'))
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(
          errorCode,
          errorMessage,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      });

  }

  handleForgetPassword() {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
      Alert.alert(
        'Email Sent!',
        'A password re-sent email has been sent to your email address'
      )
    }).catch(
      (error) => {
        Alert.alert(
          error.code,
          error.message === 'The email address is badly formatted' ? 'Please enter a valid email address' : error.message,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image source={require('./../utilities/PIDEAPP_LOG.png')} style={styles.logo} />
        <View style={styles.inputBoxStyle}><TextInput placeholder="email" style={styles.inputTextStyle} placeholderTextColor="rgba(255, 255, 255, 0.3)" onChangeText={email => this.setState({ email })} /></View>
        <View style={styles.inputBoxStyle}><TextInput placeholder="Password" style={styles.inputTextStyle} placeholderTextColor="rgba(255, 255, 255, 0.3)" secureTextEntry onChangeText={password => this.setState({ password })} /></View>
        <TouchableOpacity style={styles.loginButton} onPress={this.handleSignIn.bind(this)}><Text style={styles.loginText}>Log In</Text></TouchableOpacity>
        {/* <TouchableOpacity style={styles.loginButton} onPress={this.handleForgetPassword.bind(this)}><Text style={styles.loginText}>Forgot Password</Text></TouchableOpacity> 
        <View><Text style={styles.signupMessage}>Don't have an account? <Text style={styles.signUpLink} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up Here!</Text></Text></View> */}
      </KeyboardAvoidingView>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(236, 19, 19)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBoxStyle: {
    // backgroundColor: "#64d8cb",
    backgroundColor: "#4e68f0",
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 8,
    borderColor: "#fff",
    borderRadius: 20
  },
  inputTextStyle: {
    fontSize: 22,
    color: "black"
  },
  loginButton: {
    backgroundColor: "#4e68f0",
    width: "60%",
    color: "white",
    paddingVertical: 5,
    marginTop: 15,
    borderRadius: 20
  },
  loginText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold"
  },
  signupMessage: {
    marginTop: 20,
    color: "black",
  },
  signUpLink: {
    fontWeight: "bold"
  },
  logo: {
    marginBottom: 20
  },
});


