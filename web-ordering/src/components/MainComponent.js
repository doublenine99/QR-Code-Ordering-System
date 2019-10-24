import React, { Component } from 'react';

import Menu from './MenuComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu } from '../redux/ActionCreators';
// import { actions } from 'react-redux-form';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        menu: state.menu,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMenu: () => dispatch(fetchMenu())
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchMenu();
    }

    render() {
        // console.log("main state is:" + state.menu);
        // console.log("main props is:" + JSON.stringify(this.props));
        // const HomePage = () => {
        //   return (
        //     <Home
        //       dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        //       dishesLoading={this.props.dishes.isLoading}
        //       dishErrMess={this.props.dishes.errMess}
        //       promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        //       promoLoading={this.props.promotions.isLoading}
        //       promoErrMess={this.props.promotions.errMess}
        //       // TODO: leaders array is empty
        //       leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        //       leaderLoading={this.props.leaders.isLoading}
        //       leaderErrMess={this.props.leaders.errMess}
        //     />
        //   );
        // }

        // const DishWithId = ({ match }) => {
        //   return (
        //     <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        //       isLoading={this.props.dishes.isLoading}
        //       errMess={this.props.dishes.errMess}
        //       comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        //       commentsErrMess={this.props.comments.errMess}
        //       postComment={this.props.postComment}

        //     />
        //   );
        // };

        return (
            
            <div>
                <Switch location={this.props.location}>
                    {/* <Route path='/home' component={HomePage} /> */}

                    <Route  path='/menu' component={() => <Menu menu={this.props.menu} />} />
                    {/* <Route path='/menu/:dishId' component={DishWithId} /> */}
                    <Redirect to="/menu" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));