import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Card, COLOR} from 'react-native-material-ui';
import * as firebase from 'firebase';



class Order extends React.Component{
    
  tableItem({item}){
    return <View style={{flexDirection: "row"}}>
                  <Text style={Object.assign({}, {flex: 2}, styles.tableData)}>{item.name ? item.name : "Item"}</Text>
                  <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>{item.quantity ? item.quantity :4}</Text>
                  <Text style={Object.assign({}, {flex: 1.5}, styles.tableData)}>{item.price ? item.price : 10}</Text>
                </View>
  }
  
    render() {
        return (
            <View>
              <Card style={{container: {borderRadius: 5}}}>
                <View style = {styles.header}>
                <Text style={{fontSize: 30}}>Table Number: {this.props.tableNumber}</Text>
                <Text style={{fontSize: 20}}>Time: {this.props.ordertime ? this.props.ordertime: "3:00PM"}</Text>
                </View>
                <Text style={styles.orders}>Orders</Text>
                <View style={{flexDirection: "column"}}>
                  <View style={{flexDirection: "row", backgroundColor: COLOR.pinkA400}}>
                    <Text style={Object.assign({}, {flex: 2}, styles.tableHeader)}>Item</Text>
                    <Text style={Object.assign({}, {flex: 1.5}, styles.tableHeader)}>Quantity</Text>
                    <Text style={Object.assign({}, {flex: 1.5}, styles.tableHeader)}>Price</Text>
                  </View>
                  <FlatList
                  data={this.props.dishes ? this.props.dishes: {name: "Apple"}}
                  renderItem={({ item}) => this.tableItem(item)}
                  keyExtractor={(item, index) => index.toString()}
                   />
                </View>
              </Card>
            </View>
        )
    }
}

let styles = StyleSheet.create({
  header: {
    color: "white",
    backgroundColor: COLOR.pinkA400,
    fontWeight: "bold",
    // fontFamily: "Roboto",
    padding: 10
  },
  orders: {
    color: "black",
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  tableHeader: {
    color: "white",
    textAlign: "center",
    //fontFamily: "Roboto",
    fontWeight: "bold"
  },
  tableData: {
    // fontFamily: "Roboto",
    textAlign: "center"
  }
});
export default Order;
