import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  // Button,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Dialog, Portal, Divider } from 'react-native-paper';
import { COLOR } from 'react-native-material-ui';
// import { IconButton, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton, TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import { loggedUser } from './Login';
import { db } from '../config.js';

var tableRef;



const numColumns = 3;
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;

function sortAlphaNum(a, b) {
  // console.log(a);
  a = a.name;
  // console.log(a);
  b = b.name;
  var aA = a.replace(reA, "");
  var bA = b.replace(reA, "");
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ""), 10);
    var bN = parseInt(b.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTableName: "",
      addTableDialogOpen: false,
      orderDialogOpen: false,
      editTableDialogOpen: false,
      selectedTable: null,
      selectedTableStatus: "",
      tables: [],
      orders: [],
      unfinishOrder: [],
    }
    console.log("Table.js 93", loggedUser.displayName);
    tableRef = db.collection("restaurants").doc(String(loggedUser.displayName)).collection("tables");

    this.fetchTable();
  }
  componentDidMount = () => {


  }
  _hideAddTableDialog = () => this.setState({ addTableDialogOpen: false });
  _hideEditTableDialog = () => this.setState({ editTableDialogOpen: false });
  _hideOrdersDialog = () => this.setState({ orderDialogOpen: false });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button
          icon="plus"
          mode="contained"
          color="#26a69a"
          onPress={() => { this.setState({ addTableDialogOpen: true }) }}
        >
          <Text style={{ fontSize: 15 }}>Add new table</Text>
        </Button>
        <FlatList
          data={formatData(this.state.tables, numColumns)}
          renderItem={this.renderTable}
          keyExtractor={item => item.name}
          numColumns={numColumns}
        />

        <Portal>
          <Dialog
            visible={this.state.addTableDialogOpen}
            onDismiss={this._hideAddTableDialog}>
            {/* <Dialog.Title>Enter new table name</Dialog.Title> */}
            <Dialog.Content>
              <TextInput
                label="Enter new table name:"
                value={this.state.newTableName}
                onChangeText={name => this.setState({ newTableName: name })} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => this._hideAddTableDialog()}>Cancel</Button>
              <Button onPress={() => { this._addTable(this.state.newTableName); this.setState({ newTableName: "" }) }}>Done</Button>
            </Dialog.Actions>
            <Dialog.Actions>

            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={this.state.orderDialogOpen}
            onDismiss={this._hideOrdersDialog}>
            <Dialog.Title>Orders</Dialog.Title>
            {/* <Dialog.Content> */}
              {/* <Paragraph>This is simple dialog</Paragraph> */}
              <FlatList
                data={this.state.unfinishOrder}
                renderItem={({ item, index }) => this.renderOrder(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
            {/* </Dialog.Content> */}
            <View style={{ flexDirection: 'row' }}>
            <Dialog.Actions>
              <Button onPress={this._hideOrdersDialog}>Cancel</Button>
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={() => { this.clearOrder(this.state.selectedTable); this._hideOrdersDialog(); }}>Finished</Button>
            </Dialog.Actions>
            </View>

           
          </Dialog>
        </Portal>

        <Portal>
          <Dialog
            visible={this.state.editTableDialogOpen}
            onDismiss={this._hideEditTableDialog}>
            <Dialog.Title>Table Status</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={(value) => { this.updateStatus(this.state.selectedTable, value) }}
                value={this.fetchStatus()}
              >
                <View>
                  <Text>Wait for order</Text>
                  <RadioButton value="NEEDTO_ORDER" />
                </View>
                <View>
                  <Text>Need to Serve</Text>
                  <RadioButton value="NEEDTO_SERVE" />
                </View>
                {/* <View>
                  <Text>Wait for Pay</Text>
                  <RadioButton value="NEEDTO_PAY" />
                </View> */}
                <View>
                  <Text>Need to help</Text>
                  <RadioButton value="NEEDTO_ASSIST" />
                </View>
              </RadioButton.Group>
              <Divider></Divider>
              <Divider></Divider>

            <Text>Customer's chosen payment method</Text>
              <RadioButton.Group
                onValueChange={() => { "s" }}
                value={this.fetchPaymentOption()}    
              >
                <View>
                  <Text>EFECTIVO</Text>
                  <RadioButton value="EFECTIVO" />
                </View>
                <View>
                  <Text>VISA </Text>
                  <RadioButton value="VISA" />
                </View>

              </RadioButton.Group>

              <Button
                icon="delete"
                onPress={() => { this.deleteTable(this.state.selectedTable) }}
                uppercase="true"
              >
                Delete
              </Button>

            </Dialog.Content>
            <Dialog.Actions>

              <Button
                icon="close"
                onPress={this._hideEditTableDialog}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    );
  }
  change(x) {
    return x * 10;
  }




  // handler for press the add table button
  _addTable(tableName) {
    if (tableName !== "") {
      tableRef.doc(tableName)
        .set(
          {
            name: tableName,
            needAssistance: false,
            status: 'NEEDTO_ORDER',
          })
        .then(this._hideAddTableDialog());

    }

  }
  // handler for long press one table
  editTable(tablename) {
    this.setState({
      editTableDialogOpen: true,
      selectedTable: tablename
    })
  };

  // helper to delte the table and close the dialog
  deleteTable(tablename) {
    console.log("delete: ", tablename);
    if (tablename != null) {
      tableRef.doc(tablename).delete();
      this.setState({ editTableDialogOpen: false })
    }
  }

  // helper to fetch all tables from firebase
  fetchTable = () => {
    tableRef.onSnapshot(querySnapshot => {
      const tableList = [];
      querySnapshot.forEach(doc => {
        const { name, status, paymentChoice } = doc.data();
        // const name = Number(name.substring(5));
        tableList.push({
          name,
          status,
          paymentChoice
        })
      });

      this.setState({ tables: tableList.sort(sortAlphaNum) });
    })
  };

  // helper to render each table item for the flatlist
  renderTable = ({ item }) => {
    if (item.empty === true) {
      return <TouchableOpacity style={[styles.item, styles.itemInvisible]} />;
    }
    else return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => { this.ShowOrders(item.name) }}
        onLongPress={() => { this.editTable(item.name) }}
      >
        <Icon.Button
          name="local-dining"
          // backgroundColor="#64d8cb"
          backgroundColor={this.changeTableColor(item)}
          onPress={() => { this.ShowOrders(item.name) }}
          onLongPress={() => { this.editTable(item.name) }}
        />
        <Text style={styles.title}>
          {item.name}
        </Text>
        <Text style={{ color: this.changeTableColor(item) }}>
          {item.status}
        </Text>
      </TouchableOpacity >
    );
  };

  // handler for press the table: fetch all orders of each table and display the dialog
  ShowOrders = (tablename) => {
    this.setState({ orderDialogOpen: true });
    this.setState({ selectedTable: tablename });
    if (tablename != null) {
      tableRef.doc(tablename).collection("orders")
        .get()
        .then(snapshot => {

          // const allOrderIDs = snapshot.docs.map(docs => allOrderIDs[doc.ref.id] = doc.data());
          // console.log(allOrderIDs);
          const fetchedOrder = snapshot.docs.map(doc => doc.data());
          const unfinish = fetchedOrder.filter(order => order.finished == false);
          // const unfinishedId = 
          // console.log(unfinish)
          this.setState({ unfinishOrder: unfinish })
        }
        )
    }
  };

  // Set orders as finished for the table.
  clearOrder = (tablename) => {
    if (tablename != null) {
      let orderRef = tableRef.doc(tablename).collection("orders");
      orderRef
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var orderDoc = orderRef.doc(doc.id);
            return orderDoc.update({
              finished: true
            });
          });
        })
        .then(
          tableRef.doc(tablename)
            .update({ status: 'NEEDTO_ORDER' })
        )

    }
  };

  // Update the table's current status
  updateStatus = (tablename, value) => {
    console.log(value);
    this.setState({ selectedTableStatus: value })
    tableRef.doc(tablename).update({ status: value });
  }

  // Get the status of the selected table.
  fetchStatus = () => {
    var tableObj = this.state.tables.filter(tb => tb.name == this.state.selectedTable);
    if (tableObj.length != 0) {
      return (tableObj[0].status)
    }
  }

  // 
  fetchPaymentOption =  () => {
    
    var tableObj = this.state.tables.filter(tb => tb.name == this.state.selectedTable);
    console.log(tableObj)
    if (tableObj.length != 0) {
      return (tableObj[0].paymentChoice)
    }
  }
  // Update table color to indicate the table status.
  changeTableColor = (item) => {
    const curr = item.status;
    switch (curr) {
      // case '':
      //   return ('#64d8cb');

      case 'NEEDTO_ORDER':
        return ('#00796b');

      case 'NEEDTO_SERVE':
        return ('#FFFF00');

      case 'NEEDTO_PAY':
        return ('#FFA500');

      case 'NEEDTO_ASSIST':
        return ('#FF0000');
    }
  }
  // helper to render the order item for the flatlist in side the dialog
  renderOrder(order, index) {
    // console.log("order is :", order.ordertime)
    if (order != null) {
      // return <View>
      //   <Text>{Date(order.ordertime)}</Text>
      // </View>
      let total = 0;
      let total_quantity = 0;
      let order_number = index + 1;
      let mTop = index === 0 ? 0 : 20;
      if (order.dishes) {
        for (let i = 0; i < order.dishes.length; i++) {
          price = order.dishes[i].price;
          quantity = order.dishes[i].quantity;
          total += price * quantity;
          total_quantity += quantity;
        }
      }
      return <View style={{ flexDirection: "column", marginTop: mTop }}>
        <Text style={{ backgroundColor: COLOR.pinkA400, color: "white", fontWeight: "bold", textAlign: "center", paddingVertical: 7 }}>{"Order #" + order_number + " : " + order.ordertime.toDate().toString()}</Text>
        {/* <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{order.quantity ? order.quantity : 4}</Text> */}
        {/*<Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{order.price ? order.price : 10}</Text>*/}
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", backgroundColor: COLOR.pinkA400 }}>
            <Text style={Object.assign({}, { flex: 2 }, styles.tableHeader)}>Item</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>Quantity</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>Price</Text>
          </View>
          <FlatList
            data={order.dishes ? order.dishes : [{ name: "N/A", price: 0, quantity: 0 }]}
            renderItem={({ item }) => this.renderDish(item)}
            keyExtractor={(item, index) => index.toString()} />
          <View style={{ flexDirection: "row", backgroundColor: COLOR.pinkA400 }}>
            <Text style={Object.assign({}, { flex: 2 }, styles.tableHeader)}>Total</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>{total_quantity}</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>{total}</Text>
          </View>
        </View>
      </View>
    }
  }
  // helper to render each dish for the orders flatlist
  renderDish(dish) {
    return <View style={{ flexDirection: "row" }}>
      <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{dish ? dish.name : "N/A"}</Text>
      <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{dish ? dish.quantity : 0}</Text>
      <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{dish ? dish.price : 0}</Text>
    </View>
  }
}

Table.navigationOptions = {
  // change line26 to "header: null" to get rid of the titile
  title: "Tables",

  headerStyle: {
    paddingTop: 0,
    height: 20
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: '#64d8cb',
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


  header: {
    color: "black",
    backgroundColor: COLOR.pinkA400,
    fontWeight: "bold",
    fontSize: 30,
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
})