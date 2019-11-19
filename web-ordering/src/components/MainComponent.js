import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories } from '../redux/ActionCreators';
import Menu from './MenuComponent';
import Cart from './CartComponent';
import Promotion from './PromptDishComponent';
import OrderHistory from './OrderHistoryComponent';

import { koiSushiRestaurant } from '../Firebase/firebase'

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
        super(props);
        this.state = {
            restaurant: this.props.pathArray[0] ? this.props.pathArray[0] : "UNDEFINED",
            table: this.props.pathArray[1] ? this.props.pathArray[1] : "UNDEFINED"
        }
        console.log("(Main)props tableID: ", this.state.table)
    }

    componentDidMount() {
        this.props.fetchMenu();
        this.props.fetchCategories();
    }
    componentDidUpdate() {
        if (this.state.table != "") {
            getOrders(this.state.table);
        }
    }
    render() {
        return (
            <div>
                <BrowserRouter >
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/promotions'} component={() => <Promotion restaurant={this.state.restaurant} table={this.state.table} menu={this.props.menu} />} />
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/cart'} component={() => <Cart restaurant={this.state.restaurant} table={this.state.table} cart={this.props.cart} />} />
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/menu'} component={() => <Menu restaurant={this.state.restaurant} table={this.state.table} menu={this.props.menu} currentCategory={this.props.currentCategory} />} />
                    <Route path={'/' + this.state.restaurant + '/' + this.state.table + '/orderHistory'} component={() => <OrderHistory restaurant={this.state.restaurant} table={this.state.table} orders={orders} />} />
                    <Redirect
                        to={'/' + this.state.restaurant + '/' + this.state.table + '/promotions'}
                    />
                </BrowserRouter>
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));