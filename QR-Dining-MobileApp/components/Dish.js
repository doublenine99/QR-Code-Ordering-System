import React, {Component} from 'react';
import {ScrollView,Button,TextInput ,Picker,TouchableHighlight, Switch, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity,Modal} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import DishElement from '../components/Dish';
import * as firebase from 'firebase';
import {koiSushiMenu} from '../config';
import DishElement from './DishElement';


export default class Dish extends Component{

  constructor(props) {
    super(props);
    this.fetchTable();
  }

  state = {modalVisible: this.props.modalVisible,id: this.props.id,tableData:[]};

  fetchTable = () => {
    koiSushiMenu.doc(this.state.id)
    .onSnapshot(
      (doc) => {
        this.setState({tableData:doc.data()});
      });
  }

  setModalVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render(){
      let user = firebase.auth().currentUser;
      return(
        <View style={{flex:1, backgroundColor:'yellow', margin:3}}>
            <Modal
            style={{margin:0, justifyContent: 'center',position: 'absolute', alignItems:'center',backgroundColor:'yellow'}}
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>
                
                <DishElement id={this.state.id} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible}/>
                
            </Modal>

            <View style={styles.banner}>
                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text> Name: {this.state.tableData.name}</Text>
                        <Text> Price: {this.state.tableData.price}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text>Availability</Text>
                            <Switch value = {this.state.tableData.availability} 
                                    onValueChange={availability => 
                                    koiSushiMenu.doc(this.state.id).update({"availability": availability})}/>
                        </View>
                    </View>
                    <Text>Image Here</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Button title='Edit' onPress={() => {this.setModalVisible();}}/>
                    <Button title='Cancel'/>
                </View>
            </View>

        </View>
              
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

      label: {
        fontSize: 15,
        fontWeight: "bold",
        color: "rgb(236, 19, 19)",
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

      modalView: {
        backgroundColor: '#aaa',
        height: 500,
        justifyContent: 'center', alignItems: 'center',
        paddingTop:30
      },

      banner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(236, 19, 19)',
        //width: '100%',
      },

    profPic:{
        
        //height: "50%",
        alignSelf: 'center',
    
        //backgroundColor: 'green',
    },  
});