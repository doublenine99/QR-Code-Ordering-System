import React, { Component } from 'react';

import Menu from './MenuComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories, fetchCart } from '../redux/ActionCreators';
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
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMenu: () => dispatch(fetchMenu()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchCart: () => dispatch(fetchCart()),
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchMenu();
        this.props.fetchCategories();
        this.props.fetchCart();

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
                    <Route path='/orderhistory' component={() => <OrderHistory OrderHistory={this.props.OrderHistory} />} />
                    <Redirect to="/menu" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));