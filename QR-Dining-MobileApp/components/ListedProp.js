import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';


export default class SearchPage extends Component{
    address;
    email;
    phone;
    name ="init";
    desc;


    processData(){
        let data = this.props.home;
        let key;
        for(key in data){
            if(key == "name"){
                this.name = data[key];
            }
            else if(key == "email"){
                this.email = data[key];
            }
            else if(key == "phone"){
                this.phone = data[key];
            }
            else if(key == "address"){
                this.address = data[key];
            }
            else if(key == "description"){
                this.desc = data[key];
            }
        }

        //console.log(this.desc+" help!!");
    }
    render(){
        this.processData();
        return(
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.name}>{this.name}</Text>
                    <View style={styles.contact_box}>
                        <Entypo name="location-pin" size={20} color="rgb(236, 19, 19)" />
                        <Text style={styles.contact}>{this.address}</Text>
                    </View>
                    <View style={styles.contact_box}>
                        <Ionicons name="ios-call" size={20} color="rgb(236, 19, 19)" />
                        <Text style={styles.contact}>{this.phone}</Text>
                    </View>
                    <View style={styles.contact_box}>
                        <Ionicons name="ios-call" size={20} color="rgb(236, 19, 19)" />
                        <Text style={styles.contact}>{this.email}</Text>
                    </View>
                    <View styles="description_box">
                        <Text styles="description_text">{this.desc}</Text>
                    </View>
                </View>
                <MaterialIcons name="favorite-border" size={50} color="grey" />
            </View>

        );
        }
    }

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: "row",
                borderWidth: 2,
                borderColor: "green", 
                padding: 20,
                margin: 20,
                height: 100
              },
            image: {
                //flex: 1
            },
            info: {
                //flex: 2,
                flexDirection: "column"
            },
            name:{
                fontWeight: "bold",
                fontSize: 70,
            },
            contact_box: {
                flexDirection: "row",
                //justifyContent: "flex-start",
                padding: 10,
                //alignContent: "baseline"
            },
            contact: {
                fontWeight: "bold",
                fontSize: 35,
                color: "grey"
            },
            description_text: {
                padding: 10
            },
            description_text: {
                fontSize: 35
            }
        });
