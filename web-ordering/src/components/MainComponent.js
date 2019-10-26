import React, { Component } from 'react';

import Menu from './MenuComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, fetchCategories } from '../redux/ActionCreators';
// import { actions } from 'react-redux-form';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        menu: state.menu,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMenu: () => dispatch(fetchMenu()),
    fetchCategories: () => dispatch(fetchCategories())
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchMenu();
        this.props.fetchCategories();
    }
    
    render() {
        return (
            <div>
                <Switch location={this.props.location}>
                    
                    <Route path='/menu' component={() => <Menu menu={this.props.menu} />} />
                    {/* <Route path='/menu/' component={DishWithId} /> */}
                    <Redirect to="/menu" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));