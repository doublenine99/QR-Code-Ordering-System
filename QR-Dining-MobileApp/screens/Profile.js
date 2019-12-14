import React, { Component } from 'react';
import { ScrollView, Button, Dimensions, StyleSheet, Alert, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import ProfileElement from '../components/ProfileElement';
// import { koiSushiRestaurant } from '../config';
import * as firebase from 'firebase';
// import firebase from 'firebase';
import { loggedUser } from './Login';


class Profile extends Component {

  handleLogOut() {
    let { navigate } = this.props.navigation;
    firebase.auth().signOut().then(() => navigate('Login'));

  }

  render() {
    let user = firebase.auth().currentUser;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.banner}>
          <View style={styles.profPic}>
            <FontAwesome name="user-circle-o" size={150} color="#0198E1" />
          </View>
          <Text style={styles.displayName}>{"Welcome " + user.displayName + "!"}</Text>
          <View style={styles.menuICons}>
            <TouchableOpacity style={styles.menuIcon} onPress={() => { this.props.navigation.navigate('Menu') }}>
              <FontAwesome name="book" size={50} color="rgb(236, 19, 19)" />
              <Text style={{ fontWeight: "bold"}}>MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuIcon} onPress={() => { Alert.alert('Tel: 608-555-555') }}>
              <FontAwesome name="plus" size={50} color="rgb(236, 19, 19)" />
              <Text style={{ fontWeight: "bold"}}>ASSISTANCE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container} behavior="padding" enabled>
          <View>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.displayName}</Text>
            </View>
          </View>
          <View style={styles.container} behavior="padding" enabled>
            <View>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
            </View>
          </View>
        
        <ProfileElement label="Password" value={user.password} />
        <Button title="Logout" style={{ flex: 1, width: 20 }} onPress={() => this.handleLogOut()} />
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flexGrow: 1,
    //alignItems: 'center',
    //height: Dimensions.get('window').height,
    justifyContent: 'center',
  },

  menuICons: {
    flex: 1,
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "flex-start",
    //resizeMode: 'contain'
  },
  profileInfo: {
    flex: 2,
  },
  displayName: {
    alignSelf: 'center',
    color: 'rgb(236, 19, 19)',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 15
  },

  menuIcon: {
    margin: 0,
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey"
    //margin: 20
  },

  banner: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'flex-end',
    // backgroundColor: 'grey',
    //width: '100%',
  },

  profPic: {

    //height: "50%",
    alignSelf: 'center',

    //backgroundColor: 'green',
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgb(236, 19, 19)",
},
value: {
    fontSize: 25,
},
container: {
  borderBottomColor: '#AAA',
  borderBottomWidth: 1,
  paddingVertical: 10,
  paddingHorizontal: 20,
  flexDirection: "row",
  justifyContent: "space-between"
  //margin: 10
}
});

Profile.navigationOptions = {
  header: null,
};

export default Profile;