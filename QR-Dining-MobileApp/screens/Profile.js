import React, {Component} from 'react';
import {ScrollView,Button, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity,Modal} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import ProfileElement from '../components/ProfileElement';
import {koiSushiRestaurant} from '../config';
import * as firebase from 'firebase';


export default class Profile extends Component{

  componentDidMount() {
    this.getPhone();
  }

  state = {
    phoneNumber:''
  };

  getPhone() {
    koiSushiRestaurant.get().then((doc)=>{
      this.setState({phoneNumber: doc.data().phoneNumber})
      //console.log(doc.data().phoneNumber)
    })
  }

  
  render(){
      let user = firebase.auth().currentUser;
      return(
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.banner}>
                <View style={styles.profPic}>
                    <FontAwesome name="user-circle-o" size={150} color="#0198E1"/>
                </View>
                <Text style={styles.displayName}>{"Welcome "+user.displayName+"!"}</Text>
                <View style={styles.menuICons}>
                    <TouchableOpacity style={styles.menuIcon}>
                        <FontAwesome name="search" size={50} color="rgb(236, 19, 19)" />
                        <Text style={{fontWeight: "bold", color: "white"}} onPress={() => {this.props.navigation.navigate('Menu')}}>MENU</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.menuIcon}>
                        <MaterialIcons name="favorite" size={50} color="rgb(236, 19, 19)"/>
                        <Text style={{fontWeight: "bold", color: "white"}}>FAVORITES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuIcon}>
                        <FontAwesome name="plus" size={50} color="rgb(236, 19, 19)"/>
                        <Text style={{fontWeight: "bold", color: "white"}}>ADD NEW</Text>
                    </TouchableOpacity> */}
                </View>
              </View>
              <ProfileElement label="Name" value={user.displayName}/>
              <ProfileElement label="Email" value={user.email}/>
              {this.state.phoneNumber != null ? 
              <ProfileElement label="phoneNumber" value={this.state.phoneNumber}/>
              : console.log("nonono")}
              <ProfileElement label="Password" value={user.password}/>
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
      profileInfo:{
        flex: 2,
      },
      displayName: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 15
      },

      menuIcon:{
        margin: 0,
        backgroundColor: "green",
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
        backgroundColor: 'rgb(236, 19, 19)',
        //width: '100%',
      },

    profPic:{
        
        //height: "50%",
        alignSelf: 'center',
    
        //backgroundColor: 'green',
    },  
});

Profile.navigationOptions = {
  header: null,
};