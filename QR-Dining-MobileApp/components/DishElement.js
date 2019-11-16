import React, {Component} from 'react';
import {ScrollView,Button,TextInput,CheckBox,Alert, TouchableHighlight, Switch, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity,Modal} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import DishElement from '../components/Dish';
import * as firebase from 'firebase';
import {koiSushiMenu, koiSushiRestaurant} from '../config';

export default class DishElement extends Component{

    constructor(props) {
        super(props);
        this.fetchTable();
        this.fetchCategory();

    }

    state = {
        name: "", price:0,categories: [], description:"", 
        id:this.props.id,
        restauCatogories:[],
        checkeds :{},
        //image:""
        promptPrice:0,
    };
        
    fetchTable=()=>{
        temp=[];

        koiSushiMenu.doc(this.state.id).get().then(
            (doc)=> {
            if (doc.exists) {
            this.setState({name:doc.data().name});
            this.setState({price:doc.data().price});
            this.setState({categories:doc.data().categories});
            this.setState({description:doc.data().description});
            if (focus.data().newPrice.exists){
                
                this.setState({promptPrice:doc.data().newPrice});
            }
            // this.setState({image:doc.data().image});
            }
            else {
                console.log("No such doc");
            }
        });
    }

    fetchCategory(){
        koiSushiRestaurant
        .get()
        .then(
            (doc) => {
              this.setState({restauCatogories:doc.data().categories});
        }).then(()=>{
            
            temp = {};
            this.state.restauCatogories.forEach((e) => {
                temp[e] = false;
            });
            this.state.categories.forEach((e) => {
                if ( e in temp ) {
                    temp[e] = true;
                }
            });

            this.setState({checkeds: temp});
        });
    }

    updateAll =() => {
        koiSushiMenu.doc(this.state.id).update({name: this.state.name});
        koiSushiMenu.doc(this.state.id).update({price: this.state.price});
        koiSushiMenu.doc(this.state.id).update({newPrice: this.state.promptPrice});
        koiSushiMenu.doc(this.state.id).update({description: this.state.description});
        
        this.updateCategories();// koiSushiMenu.doc(this.state.id).update({promptPrice: this.state.promptPrice});
    }

    updateCategories =()=>{
        list = [];
        Object.entries(this.state.checkeds).forEach(([key,value]) => {
            if (value===true) {
                list.push(key);
            }
        });
        koiSushiMenu.doc(this.state.id).update({categories: list});
    }

    change2Num = (n) => {
        this.setState({price: Number(n)});
    }

    createCheckBox(){
        checkboxlist=[];

        this.state.restauCatogories.forEach((e) => {
            temp = this.state.checkeds;
            checkboxlist.push(
                <View style={{flexDirection:'row'}}>
                    <Text>{e}</Text>
                   <Switch

                       value={temp[e]}
                       onValueChange={() => {temp[e] = !temp[e];
                                            if (e === "prompt" && temp[e] === true){
                                                Alert.alert("Don't forget to set Prompt Price!");
                                            }
                                            this.setState({checkeds: temp})}}
                   />
               </View>
            );
        });
        return checkboxlist;
    }

    render(){
        return(
            //<View style={{justifyContent: 'center', alignItems:'center',backgroundColor:'yellow', padding:10}}>
            <View style={styles.container}>
                <Text>id: {this.state.id}</Text>
                <Text>Name</Text>
                <TextInput placeholder = {this.state.name} style={styles.label} onChangeText={name => this.setState({name})}/>
                <Text>Price</Text>
                <TextInput placeholder = {this.state.price.toString()} stle={styles.label} onChangeText={price => this.change2Num(price)}/>
                <Text>Prompt Price</Text>
                <TextInput placeholder = {this.state.promptPrice.toString()} style={styles.label} onChangeText={promptPrice => this.setState({promptPrice: Number(promptPrice)})}/>
                <Text>Category: </Text>
                {this.state.restauCatogories != null ? this.createCheckBox() : "aa"}
                <Text>Description</Text>
                <TextInput placeholder = {this.state.description} style={styles.label} onChangeText={description => this.setState({description})}/>

                <View style={{flexDirection:'row'}}>
                    <TouchableHighlight 
                    // style={styles.container}
                    onPress={() => {this.updateAll();this.props.setModalVisible()}}>
                    <Text style={{fontSize:20, padding: 20}}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.props.setModalVisible()}}>
                    <Text style={{fontSize:20, padding:20}}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>

            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
       // flexGrow: 1,
        alignItems: 'center',
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