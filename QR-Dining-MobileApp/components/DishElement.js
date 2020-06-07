import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Alert, TouchableHighlight, Dimensions, StyleSheet, View, Text } from 'react-native';
import { TextInput, Switch } from 'react-native-paper';
import * as firebase from 'firebase';
// import { koiSushiMenu, koiSushiRestaurant } from '../config';
import { Button, Dialog, Portal } from 'react-native-paper';
import { loggedUser } from '../screens/Login';

var MenuRef;
var RestaurantRef;
export default class DishElement extends Component {

    constructor(props) {
        super(props);
        MenuRef = firebase.firestore().collection(String(loggedUser.displayName) + "Menu");
        RestaurantRef = firebase.firestore().collection("restaurants").doc(String(loggedUser.displayName));
        this.fetchDish();
        this.fetchCategory();

    }
    state = {
        name: "",
         price: 0, 
         categories: [], 
         description: "",
        id: this.props.id,
        restauCatogories: [],
        checkeds: {},
        //image:""
        promptPrice: 0,
        availability: "",
    };

    fetchDish = () => {
        temp = [];

        MenuRef.doc(this.state.id).get().then(
            (doc) => {
                if (doc.exists) {
                    this.setState({ name: doc.data().name });
                    this.setState({ price: doc.data().price });
                    this.setState({ categories: doc.data().categories });
                    this.setState({ description: doc.data().description });
                    this.setState({ availability: doc.data().availability });

                }
                else {
                    console.log("No such doc");
                }
            });
    }

    fetchCategory() {
        RestaurantRef
            .get()
            .then(
                (doc) => {
                    this.setState({ restauCatogories: doc.data().categories });
                }).then(() => {

                    temp = {};
                    this.state.restauCatogories.forEach((e) => {
                        temp[e] = false;
                    });
                    this.state.categories.forEach((e) => {
                        if (e in temp) {
                            temp[e] = true;
                        }
                    });

                    this.setState({ checkeds: temp });
                });
    }

    updateAll = () => {
        MenuRef.doc(this.state.id).update({ name: this.state.name });
        MenuRef.doc(this.state.id).update({ price: Number(this.state.price) });
        MenuRef.doc(this.state.id).update({ description: String(this.state.description) });
        MenuRef.doc(this.state.id).update({ availability: this.state.availability });

        this.updateCategories();
    }

    updateCategories = () => {
        list = [];
        Object.entries(this.state.checkeds).forEach(([key, value]) => {
            if (value === true) {
                list.push(key);
            }
        });
        MenuRef.doc(this.state.id).update({ categories: list });
    }
    createCheckBox() {
        checkboxlist = [];

        this.state.restauCatogories.forEach((e) => {
            temp = this.state.checkeds;
            checkboxlist.push(
                <View style={{ flexDirection: 'row' }}>
                    <Text>{e}</Text>
                    <Switch
                        value={temp[e]}
                        onValueChange={() => {
                            temp[e] = !temp[e];
                            if (e === "prompt" && temp[e] === true) {
                                Alert.alert("Don't forget to set Prompt Price!");
                            }
                            this.setState({ checkeds: temp })
                        }}
                    />
                </View>
            );
        });
        return checkboxlist;
    }

    render() {
        return (
            <View
                style={{
                    padding: 10,
                    alignItems: "center",
                }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableHighlight
                        onPress={() => { this.updateAll(); this.props.setModalVisible() }}>
                        <Text style={{ fontSize: 20, padding: 20 }}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.props.setModalVisible() }}>
                        <Text style={{ fontSize: 20, padding: 20 }}>Cancel</Text>
                    </TouchableHighlight>
                </View >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: 200,
                        padding: 10,
                        // alignItems: "center"
                    }}
                    >
                        <TextInput
                            label="Enter the food name:"
                            value={this.state.name}
                            // autoFocus={true}
                            onChangeText={na => this.setState({ name: na })} />
                        <TextInput
                            label="Enter the price:"
                            value={String(this.state.price)}
                            keyboardType="numeric"
                            onChangeText={pri => this.setState({ price: (pri) })} />

                        <TextInput
                            label="Enter the description:"
                            value={this.state.description}
                            multiline={true}
                            onChangeText={des => this.setState({ description: String(des) })} />
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Availability:</Text>
                            <Switch
                                value={this.state.availability}
                                onValueChange={availability => this.setState({ availability })} />
                        </View>

                    </View>
                    <ScrollView>
                        <Text>Category: </Text>
                        {this.state.restauCatogories != null ? this.createCheckBox() : "aa"}
                    </ScrollView>
                </View>
            </View>

        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         height: Dimensions.get('window').height,
//         // flexGrow: 1,
//         alignItems: 'center',
//         //height: Dimensions.get('window').height,
//         justifyContent: 'center',
//     },
//     inputStyle: {
//         height: 80,
//         width: 300,
//         fontSize: 50,
//         color: '#212121',
//         fontSize: 40,
//         padding: 18,
//         margin: 10,
//         marginBottom: 0,
//         alignItems: 'stretch',
//     },

//     label: {
//         fontSize: 15,
//         fontWeight: "bold",
//         color: "rgb(236, 19, 19)",
//     },

//     menuICons: {
//         flex: 1,
//         margin: 0,
//         flexDirection: "row",
//         alignItems: "center",
//         alignSelf: "stretch",
//         justifyContent: "flex-start",
//         //resizeMode: 'contain'
//     },
//     profileInfo: {
//         flex: 2,
//     },
//     displayName: {
//         alignSelf: 'center',
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 32,
//         marginBottom: 15
//     },

//     modalView: {
//         backgroundColor: '#aaa',
//         height: 500,
//         justifyContent: 'center', alignItems: 'center',
//         paddingTop: 30
//     },

//     banner: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         //backgroundColor: 'rgb(236, 19, 19)',
//         //width: '100%',
//     },

//     profPic: {

//         //height: "50%",
//         alignSelf: 'center',

//         //backgroundColor: 'green',
//     },
// });