
/**
 * for combine all the reducers and create the store for the web
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import menuReducer from './reducers/menuReducer';
import categoryReducer from './reducers/categoryReducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            menu: menuReducer,
            categories: categoryReducer
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}