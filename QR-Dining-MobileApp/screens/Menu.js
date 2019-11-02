import React, { Component } from 'react';
import { ScrollView, Button, CheckBox, Dimensions, StyleSheet, SafeAreaView, FlatList, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { koiSushiMenu,koiSushiRestaurant } from '../config';
import Dish from '../components/Dish';

// TODO: upload currentIndex to firebase, and read from there
export default class Menu extends Component {

  componentDidMount() {
    this.getAllID();
  }
  state = {
    currentIndex: 10, DATA: []
  };


  fetchCategory(){
    koiSushiRestaurant
    .get()
    .then(
        (doc) => {
          this.setState({restauCatogories:doc.data().categories});
    });
} 

  createNew = () => {
    koiSushiMenu.doc(this.state.currentIndex.toString())
      .set({
        image: "", name: this.state.currentIndex.toString(), price: 0, categories: ["All"], description: "",
        id: this.state.currentIndex.toString(), availability: true,
      })
      .then(
        this.setState({ currentIndex: (this.state.currentIndex + 1) })

      );
    this.getAllID();
  }

  getAllID = () => {
    const list = [];
    koiSushiMenu
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          list.push(Number(doc.id));
        })
        this.setState({ DATA: list.sort((a, b) => a - b) })
      })
  }

  editCategory = () => {

  }

  render() {
    return (
      <View >
        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}> MENU </Text>
        <ScrollView horizontal={true}>
          {/* <TouchableOpacity onPress={() => this.fetchCategory()}>
            <Text>Add Category</Text>
          </TouchableOpacity> */}
          <Button title='All' />
          <Button title='Dissert' />
          <Button title='Drink' />
          <Button title='EDIT CATEGORY' onPress={() => { this.editCategory() }}/>
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 40 }}>
          <Button title='Back' onPress={() => { this.props.navigation.navigate('Profile') }} />
          <Button title='Add New Dish' onPress={() => { this.createNew() }} />
        </View>

        <View  style={{ height:700}}>
          <FlatList
            data={this.state.DATA}
            renderItem={({ item }) => <Dish id={item.toString()} modalVisible={false} />}
            keyExtractor={item => item}
            numColumns={2}
          />
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
  container2: {
    //flex:1,
    alignItems: 'flex-start',
  },
  displayName: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 15
  },
  banner: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'flex-end',
    backgroundColor: 'rgb(236, 19, 19)',
    //width: '100%',
  },

  profPic: {

    //height: "50%",
    alignSelf: 'center',

    //backgroundColor: 'green',
  },
});