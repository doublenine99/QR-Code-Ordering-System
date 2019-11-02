import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { koiSushiRestaurant } from '../config';

const tableRef = koiSushiRestaurant.collection('tables');

// const DATA = [
//   {
//     title:'table 1',
//     id:'1'
//   },
//   {
//     title:'table 2',
//     id:'2'
//   },
//   {
//     title:'table 3',
//     id:'3'
//   },
//   {
//     title:'table 4',
//     id:'4'
//   },
// ]

var FakeDishes = ['1. Dish A\n', '2. Dish B\n', '3. Dish C\n']

function ShowOrders(tablename) {
  console.log(tablename)
  tableRef.doc(tablename).collection("orders")
    .get()
    .then(snapshot=>{
      const orders = snapshot.docs.map(doc => doc.data());
      console.log(orders[0])
      Alert.alert(
        'Order Information',
        // 'Order Time: 2019/10/29\nDishs: ' + FakeDishes.join(''),
        'Dishs: \n ',
    //     <Button
    // onPress={ () => {config.log('ggg')}}
    // title='in alert'
    // />,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear',
            // onPress: clearTable,
            style: 'destructive'
          },
        ]
      );
    }
    )
 
};

// function doublCheck() {
//   Alert.alert(
//     title = 'Are you sure?',
//     // <Button
//     // onPress={ () => {config.log('ggg')}}
//     // title='in alert'
//     // />,
//     [
//       { text: 'Yes' },
//       { text: 'Cancel', style: 'cancel' },
//     ]
//   );
// };
// // Set table to available,
// // clear the table's order,
// // chenge the table color from yellow to green.
// function clearTable( {item} ) {
// }

// // Delete the table from the restaurant.
// function deleteTable() {
// }

// tableRef.get().then(snap => {
//   size = snap.size;
// })



function _addTable() {
  tableRef
    .get()
    .then((querySnapshot => {
      const tableList = querySnapshot.docs.map(doc => doc.data());
      console.log(tableList.length);
      var tableName = 'table ' + (tableList.length);
      tableRef.doc(tableName).set(
        { name: tableName, availability: true },
      );
    }))
}

function _deleteTable(tablename) {
  tableRef.doc(tablename).delete()
}

function _onLongPress() {
  Alert.alert(
    'Edit Table',
    '',
    [
      { text: 'Cancel', sty1e: 'cancel' },
      {
        text: 'Delete',
        onPress: _deleteTable,
        style: 'destructive'
      },
    ]
  );
};

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  // console.log(data);
  return data;
};

const numColumns = 3;

export default class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
      orders: [],
    }
    this.fetchTable();
    // this.fetchOrder();
  }

  fetchTable = () => {
    tableRef.onSnapshot(querySnapshot => {
      const tableList = [];
      querySnapshot.forEach(doc => {
        const { name } = doc.data();
        tableList.push({
          name,
        })
      });
      this.setState({ DATA: tableList });
    })
  };

  // fetchOrder = () => {
  //   tableRef
  //     .get().then(tableSnapShot => {
  //       var temp = this.state.orders;
  //       tableSnapShot.forEach((tableDoc, i) => {
  //         temp.push([]);
  //         var cartRef = tableRef.doc(tableDoc.ref.id).collection('orders');
  //         cartRef.get().then(snapshot => {
  //           snapshot.docs.forEach(doc => temp[i].push(doc.data()));
  //         })
  //         this.setState({orders: temp});
  //       })
  //     })
  // }

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <TouchableOpacity style={[styles.item, styles.itemInvisible]} />;
    }
    else return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => { ShowOrders(item.name) }}
        onLongPress={_onLongPress}
      >
        <Text style={styles.title}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    // console.log(this.state.DATA)
    // tableRef.doc('table function toString() {\n  [native code]\n  }').delete();
    return (
      <SafeAreaView style={styles.container}>
        <Button
          onPress={() => { _addTable() }}
          title='Add Table' />
        <FlatList
          data={formatData(this.state.DATA, numColumns)}
          renderItem={this.renderItem}
          keyExtractor={item => item.name}
          numColumns={numColumns}
        />
      </SafeAreaView>
    );
  }
}

Table.navigationOptions = {
  // change line26 to "header: null" to get rid of the titile
  title: 'Tables',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 3,
    height: Dimensions.get('window').width / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
})