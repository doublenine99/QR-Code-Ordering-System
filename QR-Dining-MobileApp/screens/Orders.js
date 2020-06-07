import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Order from '../components/Order'
import {
  StyleSheet,
  FlatList,
  View,
} from 'react-native';


import { Button } from 'react-native-material-ui';
import { COLOR } from 'react-native-material-ui';

import firebase from 'firebase';
import { loggedUser } from './Login';

export default class tables extends React.Component {
  constructor() {
    super();
    this.state = {
      tables: [],
      unfinished: true
    }
  }
  componentDidMount() {
    this.loadTables();
  }

  loadTables() {
    var result = []
    // koiSushiTables
    firebase.firestore().collection("restaurants").doc(String(loggedUser.displayName)).collection("tables")
      .get()
      .then(tablesSnapshot => {
        tablesSnapshot.forEach((tableDoc) => {
          // console.log(tableDoc.ref.id)
          result.push(tableDoc.ref.id)
          // this.setState({ tables: [...this.state.tables, tableDoc.ref.id] });

        })
        this.setState({ tables: result })
      },
        err => {
          console.log(`Encountered error: ${err}`);
        })

  }


  handleProgress = () => {
    this.setState({ unfinished: true });
  }

  handleServed = () => {
    this.setState({ unfinished: false });
  }

  renderObjects() {
    return (
      <View>
        <Divider style={{ backgroundColor: 'blue' }} />;
      </View>
    )
  }

  render() {
    // console.log("tables", this.state.tables.length);
    let i = 0;
    /*if (this.state.tables != null && this.state.tables.length != 0) {*/
    let tables = this.state.tables ? this.state.tables : [];
    let filter = !this.state.unfinished;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <View style={{ flexDirection: "row", marginVertical: 1 }}>
            <Button raised text="In Progress" onPress={() => this.handleProgress()} style={{ container: Object.assign({}, this.state.unfinished ? styles.tabStyle : styles.activeTabStyle, styles.leftTabStyle), text: this.state.unfinished ? styles.tabTextStyle : styles.activeTabTextStyle }} />
            <Button raised text="Served" onPress={() => this.handleServed()} style={{ container: Object.assign({}, !this.state.unfinished ? styles.tabStyle : styles.activeTabStyle, styles.rightTabStyle), text: !this.state.unfinished ? styles.tabTextStyle : styles.activeTabTextStyle }} />
          </View>
        </View>
        <FlatList
          data={this.state.tables}
          renderItem={({ item }) => <Order key={item} tableNumber={item} filter={!this.state.unfinished} />}
          keyExtractor={(item) => item}
          extraData={this.state.unfinished}
        />

      </View>
    )

  }
}

Order.navigationOptions = {
  headerMode: 'none',
  headerStyle: {
    width: 0,
    height: 0
  }
}
let styles = StyleSheet.create({
  activeTabStyle: { backgroundColor: "white" },
  tabStyle: { backgroundColor: COLOR.pinkA400 },
  tabTextStyle: { color: "white" },
  activeTabTextStyle: { color: COLOR.pinkA400 },
  leftTabStyle: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 145,
    borderTopRightRadius: 0, borderBottomRightRadius: 0, borderColor: COLOR.pinkA400, borderWidth: 1
  },
  rightTabStyle: {
    borderColor: COLOR.pinkA400,
    width: 145,
    borderBottomRightRadius: 20,
    borderWidth: 1, borderTopRightRadius: 20, borderTopLeftRadius: 0, borderBottomLeftRadius: 0
  }
});