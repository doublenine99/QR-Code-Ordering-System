import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Button } from 'react-native-material-ui';


export default class SegmentedTab extends Component{
  constructor() {
    super();
    this.state = {
      selectedIndex: true
    };
  }
 

    render() {
        return (
          <View style={{flexDirection: "column", margin: 100}}>
            <View style={{flexDirection: "row"}}>
            <Button raised text="Today" onPress={() => this.setState({selectedIndex: true})} style={{container: Object.assign({}, this.state.selectedIndex ? styles.activeTabStyle : styles.tabStyle, styles.leftTabStyle), text: this.state.selectedIndex ? styles.activeTabTextStyle : styles.tabTextStyle}}/>
            <Button raised text="Yesterday" onPress={() => this.setState({selectedIndex: false})} style={{container: Object.assign( {}, !this.state.selectedIndex ? styles.activeTabStyle : styles.tabStyle, styles.rightTabStyle), text: !this.state.selectedIndex ? styles.activeTabTextStyle : styles.tabTextStyle}}/>
            </View>
          </View>
        )
    }
  }



let styles = StyleSheet.create({
  activeTabStyle: {backgroundColor: "white"},
  tabStyle : {backgroundColor: "red"},
  tabTextStyle: {color: "white"},
  activeTabTextStyle : {color: "red"},
  leftTabStyle: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 125,
     borderTopRightRadius: 0, borderBottomRightRadius: 0, borderColor: "red", borderWidth: 1
  },
  rightTabStyle: {
    borderColor: "red", 
    width: 125,
    borderBottomRightRadius: 20,
    borderWidth: 1, borderTopRightRadius: 20, borderTopLeftRadius: 0, borderBottomLeftRadius: 0
  }
});