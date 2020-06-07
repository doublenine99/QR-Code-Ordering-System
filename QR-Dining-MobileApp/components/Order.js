import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Card, COLOR } from 'react-native-material-ui';
import { Divider } from 'react-native-paper';
// import { koiSushiTables } from '../config';
import firebase from 'firebase';
import { loggedUser } from '../screens/Login';



class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    }
  }
  componentDidMount() {
    //this.loadOrders();
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.filter !== prevProps.filter) {
      this.setState({ filter: this.props.filter });
    }
  }

  loadOrders() {
    var result = []
    // console.log(this.props.tableNumber)
    // console.log("orders: ", koiSushiTables.doc(this.props.tableNumber).collection("orders").ordertime);
    firebase.firestore().collection("restaurants").doc(String(loggedUser.displayName)).collection("tables").doc(this.props.tableNumber).collection("orders")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          result.push(doc.data())
        })
        this.setState({ orders: result })

      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  }

  orderDish(dish, index) {
    return <View style={{ flexDirection: "row" }}>
        <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{dish ? index+1 : "N/A"}</Text>
      <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{dish ? dish.name : "N/A"}</Text>
      <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{dish ? dish.quantity : 0}</Text>
      <Text style={Object.assign({}, { flex: 1.5 }, styles.tableData)}>{dish ? dish.price : 0}</Text>
    </View>
  }

  tableItem(order, index) {
    // console.log("order is :", order.ordertime)
    if (order != null) {

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
      date = (order.ordertime ? order.ordertime.toDate() : "No date");
      let day;

      if (date != "No Date") {
        day = date.toLocaleString();
      }
      return <View style={{ flexDirection: "column" }}>

        <Text style={{ backgroundColor: COLOR.pinkA400, color: "white", fontWeight: "bold", textAlign: "center"}}>{"Order #" + order_number + " : " + day}</Text>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", backgroundColor: COLOR.pinkA400 }}>
           <Text style={Object.assign({}, { flex: 2 }, styles.tableHeader)}>Index</Text>
            <Text style={Object.assign({}, { flex: 2 }, styles.tableHeader)}>Item</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>Amount</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>Each Price</Text>
          </View>
          <FlatList
            data={order.dishes ? order.dishes : [{ name: "N/A", price: 0, quantity: 0 }]}
            renderItem={({ item,index }) => this.orderDish(item,index)}
            keyExtractor={(item, index) => index.toString()} />
          <View style={{ flexDirection: "row", backgroundColor: COLOR.pinkA400, marginVertical: 5 }}>
            <Text style={Object.assign({}, { flex: 2 }, styles.tableHeader)}>Total</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>{total_quantity}</Text>
            <Text style={Object.assign({}, { flex: 1.5 }, styles.tableHeader)}>{total}</Text>
          </View>
        </View>
      </View>
    }
  }

  render() {
    // console.log("aaa", this.state.orders)
    this.loadOrders();
    if (this.state.orders != null && this.state.orders.length != 0) {
      data = this.state.orders.filter(order => order.finished === this.props.filter);
      if (data.length === 0) return <View></View>
      return (
        <View style={{ padding: 10 }}>
          <Card style={{ container: { borderRadius: 10, marginVertical: 25, marginHorizontal: 0 } }}>
            <View style={styles.header}>
              <Text style={styles.header}>Table Number: {this.props.tableNumber}</Text>
            </View>
            <Divider />
            <FlatList
              data={data}
              renderItem={({ item, index }) => this.tableItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </Card>
          <Divider />
        </View>
      )
    } else {
      return <View></View>
    }

  }
}

let styles = StyleSheet.create({
  header: {
    color: "white",
    backgroundColor: COLOR.pinkA400,
    fontWeight: "bold",
    fontSize: 15,
    padding: 10,
    // fontFamily: "Roboto",
  },
  orders: {
    color: "black",
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  tableHeader: {
    color: "white",
    textAlign: "center",
    //fontFamily: "Roboto",
    fontSize: 15,
    padding: 10,
    fontWeight: "bold",

  },
  tableData: {
    // fontFamily: "Roboto",
    textAlign: "center",
    fontSize: 15,
    padding: 3,
  }
});
export default Order;
