import React, {Component} from 'react';
import * as firebase from 'firebase'
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {koiSushiRestaurant} from '../config';

export default class ProfileElement extends Component{
//     constructor(props){
//         super(props);
        
// //    console.log(props)
// }
    state = {
        editMode: false,
        value: this.props.value
    };
    handlePencil = () => {
        this.setState({editMode: true});
    };

    handleTick = () => {
        let user = firebase.auth().currentUser;
        if(this.label == "Email"){
            user.updateEmail(this.state.value)
        }
        else if(this.label == "Name"){
            user.updateDisplayName(this.state.value)
        }
        else if(this.label == "Password"){
            user.updatePassword(this.state.value)
        }
        else if(this.label == "phoneNumber"){
            koiSushiRestaurant.update({phoneNumber: this.state.value});
            //user.updatePhoneNumber(this.state.value)
        }
        this.setState({editMode: false});
    };

    render(){
        let element = this.props.value ? <Text style={styles.value}>{this.props.value}</Text> : 
                        <Entypo name="lock" color="red" size={25} />;
        element = this.state.editMode ? <TextInput placeholder={this.props.value ? this.state.value : "Enter New Password"} 
                                             placeholderTextColor="rgba(0, 0, 0, 0.3)" style={{fontSize: 22,color: "black"}} 
                                             secureTextEntry={this.props.label == "Password"? true : false} 
                                             onChangeText={value => this.setState({value})}/> : element;
        let icon = this.state.editMode ? "check-circle" : "pencil";
        return(
            <View style={styles.container} behavior="padding" enabled>
                <View>
                <Text style={styles.label}>{this.props.label}</Text>
                {element}
                </View>
                <TouchableOpacity onPress={this.state.editMode ? this.handleTick : this.handlePencil}>
                <Text></Text>
                <MaterialCommunityIcons name={icon} size={30} color="rgb(236, 19, 19)"/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#AAA',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between"
        //margin: 10
    },
    label: {
        fontSize: 15,
        fontWeight: "bold",
        color: "rgb(236, 19, 19)",
    },
    value: {
        fontSize: 25,
        color: 'grey'
    }

});
