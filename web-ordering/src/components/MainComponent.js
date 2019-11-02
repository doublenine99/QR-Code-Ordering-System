import React, { Component } from 'react';

import Menu from './MenuComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories, fetchCart ,fetchOrders} from '../redux/ActionCreators';
import Cart from './CartComponent';
import Promotion from './PromptDishComponent';
import OrderHistory from './OrderHistoryComponent';
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

const mapDispatchToProps = dispatch => ({
    fetchMenu: () => dispatch(fetchMenu()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCart: () => dispatch(fetchCart()),
    fetchOrders:()=>dispatch(fetchOrders()),
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchMenu();
        this.props.fetchCategories();
        this.props.fetchCart();
        this.props.fetchOrders();
    

    }
    // componentDidUpdate() {
    //     console.log(this.props.currentCategory)
    // }

    render() {
        return (
            <div>
                <Switch location={this.props.location}>
                    <Route path='/promotions' component={() => <Promotion menu={this.props.menu} />} />
                    <Route path='/cart' component={() => <Cart cart={this.props.cart} />} />
                    <Route path='/menu' component={() => <Menu menu={this.props.menu} currentCategory={this.props.currentCategory} />} />
                    <Route path='/orderhistory' component={() => <OrderHistory orders={this.props.orders} />} />
                    <Redirect to="/menu" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));