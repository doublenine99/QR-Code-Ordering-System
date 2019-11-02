import React, {Component} from 'react';
import {Alert, Text, ScrollView, Image, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, TextInput} from 'react-native';
import { withOrientation } from 'react-navigation';
import {koiSushiRestaurant} from '../config';
import firebase from 'firebase'

export default class Signup extends Component{
  state = {
    name: '',
    email: '', 
    password: '', 
    confirmPassword: '',
    username: '',
    phoneNumber:'',
    errorMessage: null 
  };
  
  handleSignUp = () => {
    if(this.state.confirmPassword !== this.state.password){
      Alert.alert(
        'Passwords Do Not Match',
        'Please re-enter your password correctly',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    else{
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          let user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.state.username,
            uid: this.state.username
          }).then(() => {
            koiSushiRestaurant.update({"phoneNumber": this.state.phoneNumber});
            firebase.auth().signOut();
            this.props.navigation.navigate('Login')
          });
        })
        .catch(error => this.setState({ errorMessage: error.message }));
    }

  }

  render(){
    return (<ScrollView>
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Image source={require('./../utilities/logo.png')} />
            <Text style={styles.heading}>Sign up here</Text>
            <View style={styles.inputBoxStyle}><TextInput placeholder="Name" style={styles.inputTextStyle} placeholderTextColor="rgba(0, 0, 0, 0.3)" onChangeText={name => this.setState({ name })}/></View>
            <View style={styles.inputBoxStyle}><TextInput placeholder="Email" style={styles.inputTextStyle} placeholderTextColor="rgba(0, 0, 0, 0.3)" onChangeText={email => this.setState({ email })}/></View>
            <View style={styles.inputBoxStyle}><TextInput placeholder="Username" style={styles.inputTextStyle} placeholderTextColor="rgba(0, 0, 0, 0.3).3)" onChangeText={username => this.setState({ username })}/></View>
            <View style={styles.inputBoxStyle}><TextInput placeholder="Phone Number" style={styles.inputTextStyle} placeholderTextColor="rgba(0, 0, 0, 0.3).3)" onChangeText={phoneNumber => this.setState({ phoneNumber })}/></View>
            <View style={styles.inputBoxStyle}><TextInput placeholder="Password" style={styles.inputTextStyle} placeholderTextColor="rgba(0, 0, 0, 0.3)" secureTextEntry onChangeText={password => this.setState({ password })}/></View>
            <View style={styles.inputBoxStyle}><TextInput placeholder="Re-enter Password" style={styles.inputTextStyle} placeholderTextColor="rgba(0, 0, 0, 0.3)" secureTextEntry onChangeText={confirmPassword => this.setState({ confirmPassword })}/></View>
            <TouchableOpacity style={styles.signupButton} onPress={this.handleSignUp}>
              <Text style={styles.signupText}>Create Account</Text>
            </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>);
  }

  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(236, 19, 19)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      signupText: {
        color: "white",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold"
      },
      signupButton: {
        backgroundColor: "green",
        width: "70%",
        color: "white",
        paddingVertical: 5,
        marginVertical: 40,
        borderRadius: 20
      },
      heading: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        // fontFamily: "Roboto",
        marginBottom: 20,
        fontWeight: "900"

      },

      inputBoxStyle: {
        backgroundColor: "white",//"rgb(204, 51, 51)",
        width: "80%",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
        marginVertical: 10
        
      },

      inputTextStyle: {
        fontSize: 22,
        color: "black",
      },
}
);