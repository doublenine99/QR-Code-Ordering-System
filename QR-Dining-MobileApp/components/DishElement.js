import React, {Component} from 'react';
import {ScrollView,Button,TextInput,CheckBox, TouchableHighlight, Switch, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity,Modal} from 'react-native';
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
        checkeds :[],
        //image:""
        //, promptPrice:0,
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
            //this.setState({promptPrice:doc.data().promptPrice});
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
        });
    }

    updateAll =() => {
        koiSushiMenu.doc(this.state.id).update({name: this.state.name});
        koiSushiMenu.doc(this.state.id).update({price: this.state.price});
        koiSushiMenu.doc(this.state.id).update({categories: this.state.categories});
        koiSushiMenu.doc(this.state.id).update({description: this.state.description});
        // koiSushiMenu.doc(this.state.id).update({promptPrice: this.state.promptPrice});
        // koiSushiMenu.doc(this.state.id).update({image: this.state.image});
    }

    change2Num = (n) => {
        this.setState({price: Number(n)});
    }

    createCheckBox(){
        checkboxlist=[];
        temp = [];
        this.state.restauCatogories.forEach((e) => {
            temp.push({[e]:false})
        });
        this.state.categories.forEach((e) => {
            temp.push({[e]:true})
        });
        //this.setState({checkeds: temp});

        this.state.restauCatogories.map((cb, key) => {
            checkboxlist.push(
                 <View style={{flexDirection:'row'}, key={cb}}>
                    <CheckBox
                        key={cb}
                       value={temp[cb]}
                        //onValueChange={() => {temp.push({[e]:!temp[e]});
                         //                     this.setState({checkeds: temp})}}
                    />
                    <Text key={key}>{cb}</Text>
                </View>
        )});
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
                {/* <Text>Prompt Price</Text>
                <TextInput placeholder = {this.state.promptPrice} style={styles.label} onChangeText={promptPrice => this.setState({promptPrice})}/> */}
                <Text>Category: </Text>
                {this.state.restauCatogories != null ? this.createCheckBox() : "aa"}
                <Text>Description</Text>
                <TextInput placeholder = {this.state.description} style={styles.label} onChangeText={description => this.setState({description})}/>
                <Text>image</Text>

                <View style={{flexDirection:'row'}}>
                    <TouchableHighlight onPress={() => {this.updateAll();this.props.setModalVisible()}}>
                    <Text style={{fontSize:20, paddingBottom: 10}}>SAVE</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {this.props.setModalVisible()}}>
                    <Text style={{fontSize:20}}>CANCEL</Text>
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