import { FETCH_CART } from '../ActionTypes';

const cartReducer = (state = {}, action) => {

    switch (action.type) {
        case FETCH_CART:
            // console.log("menu reduer return: " + JSON.stringify(action.payload));
            return action.payload;
        default:
            return state;
    }
};

export default cartReducer;