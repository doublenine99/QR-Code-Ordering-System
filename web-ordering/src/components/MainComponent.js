import React, { Component } from 'react';
import { Switch, Route, Redirect, Router, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories, fetchCart, fetchOrders } from '../redux/ActionCreators';
import Menu from './MenuComponent';
import Cart from './CartComponent';
import Promotion from './PromptDishComponent';
import OrderHistory from './OrderHistoryComponent';
import { createBrowserHistory } from 'history'
import { koiSushiRestaurant } from '../Firebase/firebase'

const history = createBrowserHistory();  // use to track the user url to identify the table

var orders = [];
const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        categories: state.categories,
        cart: state.cart,
        currentCategory: state.currentCategory,
        orders: state.orders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMenu: () => dispatch(fetchMenu()),
    fetchCategories: () => dispatch(fetchCategories()),
});
const getOrders = (tablename) => {
    koiSushiRestaurant.collection('tables').doc(tablename).collection('orders')
        .onSnapshot(snapshot => {
            orders = snapshot.docs.map(doc => doc.data());
            // console.log("Received doc snapshot: ", (orders));
        },
            err => {
                console.log(`Encountered error: ${err}`);
            });
};

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableID: ""
        }
    }

    componentDidMount() {

        // console.log("qr: ", history.location.pathname)
        this.setState({ tableID: String(history.location.pathname).substring(1) });
        // console.log(this.state.tableID);
        this.props.fetchMenu();
        this.props.fetchCategories();



    }
    componentDidUpdate() {
        // console.log("state: ", this.state.tableID)
        if (this.state.tableID != "") {
            getOrders(this.state.tableID);
        }

    }

    render() {
        return (
            <div>
                <Router history={this.props.history}>
                    <Route path='/promotions' component={() => <Promotion table={this.state.tableID} menu={this.props.menu} />} />
                    <Route path='/cart' component={() => <Cart table={this.state.tableID} cart={this.props.cart} />} />
                    <Route path='/menu' component={() => <Menu table={this.state.tableID} menu={this.props.menu} currentCategory={this.props.currentCategory} />} />
                    <Route path='/orderhistory' component={() => <OrderHistory table={this.state.tableID} orders={orders} />} />
                    <Redirect
                        to={{
                            pathname: '/promotions',
                        }}
                    />
                </Router>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));