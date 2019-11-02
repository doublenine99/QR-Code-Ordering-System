import React, {Component} from 'react';
import * as firebase from 'firebase';
import ListedProp from '../components/ListedProp'
import {ScrollView, StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
//import { FlatList } from 'react-native-gesture-handler';

let allRooms;
export default class SearchPage extends Component{
    state = {
        roomList: {}
    }
    getData(){
        firebase.database().ref('properties/').once("value").then(snapshot => {
            this.setState({roomList: snapshot.val()});
            //console.log(snapshot.val());
        });
        
    }

    getDataArray(){
        let array = [];
        let p;
        for(p in this.state.roomList){
            array.push(this.state.roomList[p]);
        }

        return array;
        
    }

    
    render(){
        this.getData();
        let data = this.getDataArray();
        
            
        
        return(
            <View> 
            </View>

        );
        }
    }

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              },
        });
