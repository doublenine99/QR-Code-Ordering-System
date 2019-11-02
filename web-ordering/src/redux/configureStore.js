
/**
 * for combine all the reducers and create the store for the web
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import menuReducer from './reducers/menuReducer';
import categoriesReducer from './reducers/categoryReducer';
import currentCategoryReducer from './reducers/currentCategoryReducer';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            menu: menuReducer,
            categories: categoriesReducer,
            cart: cartReducer,
            currentCategory: currentCategoryReducer,
            orders: ordersReducer,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}