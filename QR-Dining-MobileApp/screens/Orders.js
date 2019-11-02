import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Order from '../components/Order'
import SegmentedTab from '../components/SegmentedTab'
import {
  Image,
  Platform,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { koiSushiTables } from '../config';

import { Button } from 'react-native-material-ui';
import { withOrientation } from 'react-navigation';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
/*const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};*/


export default class Orders extends React.Component {
  componentDidMount(){
    this.loadTables();
  }
  tables = null;
  constructor() {
    super();
    this.state = {
      tables: null,
      orders: [],
    }
  }
  loadTables(){
    koiSushiTables
      .get().then(tablesSnapshot => {
          tablesSnapshot.forEach((tableDoc, i) => {

              // console.log(doc.ref.id)
              // console.log(koiSushiRestaurant.collection('tables').doc(tableDoc.ref.id).collection("cart"));
              koiSushiTables.doc(tableDoc.ref.id).collection("orders").get().then(snapshot => {
                if(!snapshot.empty) {
                  snapshot.docs.forEach(doc => {
                    this.setState({orders: [...this.state.orders, doc.data()]});
                  })
                }
              })

          })
          
          
      },
          err => {
              console.log(`Encountered error: ${err}`);
          });

          
  }
  render() {
      console.log(this.state.orders);
      /*.then(snapshot => {
        this.setState({tables: snapshot.map(doc => doc.data())});
      }, err => {
        console.log(`Encountered error: ${err}`);
      });*/

    return (
      <View>
        <SegmentedTab />
        <FlatList
        data={this.state.orders}
        renderItem={({ item, index}) => <Order tableNumber={index.toString()} order={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    )
  }
}


/*Orders.navigationOptions = {
  // change line26 to "header: null" to get rid of the titile
  title: 'Orders',
};*/

let styles = StyleSheet.create({

});
