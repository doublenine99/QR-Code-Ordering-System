import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';

export default class Login extends Component{
  state = {
    email: '',
    password: ''
  };

  handleSignIn(){
    firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert(
        errorCode,
        errorMessage,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    });
    
  }
  render(){
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image source={require('./../utilities/logo.png')} style={styles.logo}/>
          <View style={styles.inputBoxStyle}><TextInput placeholder="Username" style={styles.inputTextStyle} placeholderTextColor="rgba(255, 255, 255, 0.3)" onChangeText={email => this.setState({ email })}/></View>
          <View style={styles.inputBoxStyle}><TextInput placeholder="Password" style={styles.inputTextStyle} placeholderTextColor="rgba(255, 255, 255, 0.3)" secureTextEntry onChangeText={password => this.setState({ password })}/></View>
          <TouchableOpacity style={styles.loginButton} onPress={this.handleSignIn.bind(this)}><Text style={styles.loginText}>Log In</Text></TouchableOpacity>
          <View><Text style={styles.signupMessage}>Don't have an account? <Text style={styles.signUpLink} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up Here!</Text></Text></View>
        </KeyboardAvoidingView>
      );
  
    }

  }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'rgb(236, 19, 19)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputBoxStyle: {
        backgroundColor: "rgb(204, 51, 51)",
        width: "80%",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 8,
        borderColor: "#fff",
        borderRadius: 20
      },
      inputTextStyle: {
        fontSize: 22,
        color: "white"
      },
      loginButton: {
        backgroundColor: "green",
        width: "50%",
        color: "white",
        paddingVertical: 5,
        marginBottom: 40,
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
        color: "white",
      },
      logo:{
        height: "40%",
      },
    });
  

