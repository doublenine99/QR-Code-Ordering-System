import React, { Component } from 'react';
import { Switch, Route, Redirect, Router, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories, fetchCart, fetchOrders } from '../redux/ActionCreators';
import Menu from './MenuComponent';
import Cart from './CartComponent';
import Promotion from './PromptDishComponent';
import OrderHistory from './OrderHistoryComponent';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();  // use to track the user url to identify the table


// import { actions } from 'react-redux-form';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        categories: state.categories,
        cart: state.cart,
        currentCategory: state.currentCategory,
        orders: state.orders
    }
}
var tbl;
const mapDispatchToProps = dispatch => ({
    fetchMenu: () => dispatch(fetchMenu()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCart: () => dispatch(fetchCart()),
    fetchOrders: () => dispatch(fetchOrders()),
});

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

        this.props.fetchMenu();
        this.props.fetchCategories();
        tbl = this.state.table;
        console.log(this.state.tableID);
        this.props.fetchCart(this.state.tableID);
        this.props.fetchOrders();



    }
    // componentDidUpdate() {
    //     console.log("state: ", this.state.tableID)
    // }

    render() {
        return (
            <div>
                <Router history={this.props.history}>
                    <Route path='/promotions' component={() => <Promotion table={this.state.tableID} menu={this.props.menu} />} />
                    <Route path='/cart' component={() => <Cart table={this.state.tableID} cart={this.props.cart} />} />
                    <Route path='/menu' component={() => <Menu table={this.state.tableID} menu={this.props.menu} currentCategory={this.props.currentCategory} />} />
                    <Route path='/orderhistory' component={() => <OrderHistory table={this.state.tableID} orders={this.props.orders} />} />
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