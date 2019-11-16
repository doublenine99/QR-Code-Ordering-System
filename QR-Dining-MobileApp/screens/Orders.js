import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Order from '../components/Order'
//import SegmentedTab from '../components/SegmentedTab'
import {
  Image,
  Platform,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { koiSushiTables } from '../config';

import { Button } from 'react-native-material-ui';
import { withOrientation } from 'react-navigation';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import SafeAreaView from 'react-native-safe-area-view';


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
    koiSushiTables
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

  renderObjects(){
    return (
      <View>
        <Divider style={{ backgroundColor: 'blue' }} />;
      </View>
    )
  }

  render() {
    // console.log("tables", this.state.tables.length);
    let i = 0;
    if (this.state.tables != null && this.state.tables.length != 0) {
      let tables = this.state.tables;
      let filter = !this.state.unfinished;
      return (
        <SafeAreaView>
        {/*<ScrollView contentContainerStyle={{ alignItems: "center", paddingTop: 10 }}>*/}
          {/*Segmented Tab*/}
          <View style={{ flexDirection: "column", alignSelf: "center" }}>
            <View style={{ flexDirection: "row", marginVertical: 20 }}>
              <Button raised text="In Progress" onPress={() => this.handleProgress()} style={{ container: Object.assign({}, this.state.unfinished ? styles.activeTabStyle : styles.tabStyle, styles.leftTabStyle), text: this.state.unfinished ? styles.activeTabTextStyle : styles.tabTextStyle }} />
              <Button raised text="Served" onPress={() => this.handleServed()} style={{ container: Object.assign({}, !this.state.unfinished ? styles.activeTabStyle : styles.tabStyle, styles.rightTabStyle), text: !this.state.unfinished ? styles.activeTabTextStyle : styles.tabTextStyle }} />
            </View>
          </View>
          <FlatList
            data={this.state.tables}
            renderItem={({ item }) => <Order key={item} tableNumber={item} filter={!this.state.unfinished} />}
            keyExtractor={(item) => item}
            extraData={this.state.unfinished}
          />
        {/*</ScrollView>*/}
        </SafeAreaView>
      )
    } else {
      return <View>
        <Text>
          Loading
        </Text>
      </View>
    }
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