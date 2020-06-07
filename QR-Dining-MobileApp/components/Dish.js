import React, { Component } from 'react';
import { ScrollView, Button, TextInput, Alert, Picker, TouchableHighlight, Switch, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
// import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import DishElement from '../components/Dish';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
// import { koiSushiMenu } from '../config';
import DishElement from './DishElement';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Avatar } from 'react-native-paper';

import { loggedUser } from '../screens/Login';

var MenuRef;

export default class Dish extends Component {

  constructor(props) {
    super(props);
    MenuRef = firebase.firestore().collection(String(loggedUser.displayName) + "Menu");
    this.fetchTable();
  }

  state = {
    // idExist: true,
    modalVisible: this.props.modalVisible,
    id: this.props.id,
    tableData: []
  };

  fetchTable = () => {
    if (this.state.id != null) {
      MenuRef.doc(this.state.id)
        .onSnapshot(
          (doc) => {
            this.setState({ tableData: doc.data() });
          });
    }


  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1
    });

    if (!result.cancelled) {
      this.uploadImage(result.uri, this.state.id)
        .then(() => {
          this.fetchTable();
        })
        .catch((error) => {
          Alert.alert('Error: ', error.message);
        });
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref(String(loggedUser.displayName) + "/" + imageName);
    const url = ref.put(blob);

    ref.put(blob).then(function (result) {
      //Get URL and store to pass
      ref.getDownloadURL().then((url) => {
        MenuRef.doc(imageName).update({ image: url.toString() });
      });
    });
  }

  render() {
    if (this.state.tableData == null) {
      return <View>
      </View>
    }

    let user = firebase.auth().currentUser;
    return (
      <View
        style={{
          flex: 10,
          border: 'solid',
          margin: 1,

        }}
      >
        <Modal
          style={{ margin: 0, justifyContent: 'center', position: 'absolute', alignItems: 'center' }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>

          <DishElement id={this.state.id} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} />

        </Modal>



        <View>
          <Text> Name: {this.state.tableData.name}</Text>
          <Text> Price: ${this.state.tableData.price}</Text>
          <TouchableOpacity
            onPress={() => this.pickImage()}>
            <Avatar.Image size={50}
              source={{ uri: (this.state.tableData.image !== "") ? this.state.tableData.image : "https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/koisushiMenu%2Fdefault-food-image.jpg?alt=media&token=e6958bef-eae1-4144-b670-e717768d518f" }}
            />
            <Text>Change Image</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Button title='Edit' onPress={() => { this.setModalVisible(); }} />
            <Button title='Delete' onPress={() => { this.props.deleteDish(this.state.id); }} />
          </View>
        </View>
      </View>
    );
  }
}

