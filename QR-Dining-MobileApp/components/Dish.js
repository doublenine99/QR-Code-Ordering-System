import React, { Component } from 'react';
import { ScrollView, Button, TextInput, Alert,Picker, TouchableHighlight, Switch, Dimensions, StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import DishElement from '../components/Dish';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { koiSushiMenu } from '../config';
import DishElement from './DishElement';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
//import {Card} from 'reaact-native-elements';

export default class Dish extends Component {

  constructor(props) {
    super(props);
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
      koiSushiMenu.doc(this.state.id)
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
    var ref = firebase.storage().ref("koisushiMenu/" + imageName);
    const url = ref.put(blob);

    ref.put(blob).then(function(result){
      //Get URL and store to pass
      ref.getDownloadURL().then((url) => {
        koiSushiMenu.doc(imageName).update({image: url.toString()});
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
      <View style={{ flex: 1,backgroundColor:'#64d8cb', margin: 3,height:150 }}>
        <Modal
          style={{ margin: 0, justifyContent: 'center', position: 'absolute', alignItems: 'center', backgroundColor: 'yellow' }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>

          <DishElement id={this.state.id} modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} />

        </Modal>

        <View style={styles.banner}>
          <View style={{ flexDirection: 'row' ,flex:1}}>

            <View style={{ justifyContent: 'center'}}>
              <Text> Name: {this.state.tableData.name}</Text>
              <Text> Price: {this.state.tableData.price}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text>Availability</Text>
                <Switch value={this.state.tableData.availability}
                  onValueChange={availability =>
                    koiSushiMenu.doc(this.state.id).update({ "availability": availability })} />
              </View>
            </View>
            <TouchableOpacity style = {{flex:1}} onPress={() => this.pickImage()}>
              <Image style = {{flex:1}}
                source = {{url: this.state.tableData.image}}
              />
              <Text>Change Image</Text>
            </TouchableOpacity>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <Button title='Edit' onPress={() => { this.setModalVisible(); }} />
            <Button title='Delete' onPress={() => { this.props.deleteDish(this.state.id); }} />
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
  profileInfo: {
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
    paddingTop: 30
  },

  banner: {
    flex: 1,
    //backgroundColor: 'rgb(236, 19, 19)',
    //width: '100%',
  },

  profPic: {

    //height: "50%",
    alignSelf: 'center',

    //backgroundColor: 'green',
  },
});