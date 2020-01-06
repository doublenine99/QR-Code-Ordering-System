import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories } from '../redux/ActionCreators';
import Menu from './MenuComponent';
import Cart from './CartComponent';
import Promotion from './PromptDishComponent';
import OrderHistory from './OrderHistoryComponent';

import { firestore } from 'firebase'
import { restaurants, database } from '../Firebase/firebase'

// const db = firestore();


const mapStateToProps = (state) => {
    return {
        // menu: state.menu,
        // categories: state.categories,
        cart: state.cart,
        currentCategory: state.currentCategory,
        // orders: state.orders
    }
}

const mapDispatchToProps = dispatch => ({
    // fetchMenu: () => dispatch(fetchMenu()),
    // fetchCategories: () => dispatch(fetchCategories()),
});


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.pathArray[0] ? this.props.pathArray[0] : null,
            table: this.props.pathArray[1] ? this.props.pathArray[1] : null,
            orders: [],
            menu: [],
            cart: [],
            tax: null
        }
        console.log("(Main)props tableID: ", this.state.table);

    }

    componentDidMount() {
        this.getOrders(this.state.restaurant, this.state.table);
        this.getMenu(this.state.restaurant);
        this.getCart(this.state.restaurant, this.state.table);
    }

    render() {
        return (
            <div>
                <BrowserRouter >
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/promotions'} component={() => <Promotion restaurant={this.state.restaurant} table={this.state.table} menu={this.state.menu} />} />
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/cart'} component={() => <Cart restaurant={this.state.restaurant} table={this.state.table} cart={this.state.cart} tax={this.state.tax} />} />
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/menu'} component={() => <Menu restaurant={this.state.restaurant} table={this.state.table} menu={this.state.menu} currentCategory={this.props.currentCategory} />} />
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/orderHistory'} component={() => <OrderHistory restaurant={this.state.restaurant} table={this.state.table} orders={this.state.orders} tax={this.state.tax} />} />
                    <Redirect
                        to={'/' + this.state.restaurant + '/' + this.state.table + '/menu'}
                    />
                </BrowserRouter>
            </div>
        );
    }

    getMenu = (restaurantName) => {
        const menuRef = restaurantName + "Menu";
        if (restaurantName != null) {
            database.collection(menuRef).get().then(snapshot => {
                const menu = snapshot.docs.map(doc => doc.data());
                // console.log("ready to dispatch menu: " + JSON.stringify(menu)); // array of food
                this.setState({ menu: menu });
            })
                .catch((err) => {
                    console.log('Error fetching menu', err);
                });
        }
    };
    getCart = (restaurantName, tablename) => {
        if (restaurantName != null && tablename != null) {
            // get the tax
            restaurants.doc(restaurantName)
                .get()
                .then(doc => this.setState({ tax: doc.data().tax }))

            restaurants.doc(restaurantName).collection('tables').doc(tablename).collection('cart')
                .onSnapshot(snapshot => {

                    const cart = snapshot.docs.map(doc => doc.data());
                    // console.log("Received doc snapshot: ", (orders));
                    this.setState({ cart: cart });

                },
                    err => {
                        console.log(`Encountered error: ${err}`);
                    });
        }
    };
    getOrders = (restaurantName, tablename) => {
        if (restaurantName != null && tablename != null) {
            restaurants.doc(restaurantName).collection('tables').doc(tablename).collection('orders')
                .onSnapshot(snapshot => {

                    const orders = snapshot.docs.map(doc => doc.data());
                    // console.log("Received doc snapshot: ", (orders));
                    this.setState({ orders: orders });

                },
                    err => {
                        console.log(`Encountered error: ${err}`);
                    });
        }
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));