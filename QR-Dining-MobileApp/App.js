import React, {Component, useState } from 'react';
//import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {YellowBox} from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import MainTab from './components/MainTab';
import Orders from './screens/Orders';
import Menu from './screens/Menu';
import Temp from './screens/SearchPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';
import SearchPage from './screens/SearchPage';

// firebase.initializeApp(firebaseConfig);
YellowBox.ignoreWarnings(['Setting a timer']);

const AppNavigator = createStackNavigator({
  Login: Login,
  Signup: Signup,
  Main: MainTab,
  Profile: Profile,
  Menu: Menu,
},{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
      width: 0,
      height: 0
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
