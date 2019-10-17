
/**
 * for combine all the reducers and create the store for the web
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import menuReducer from './reducers/menuReducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            menu: menuReducer
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}