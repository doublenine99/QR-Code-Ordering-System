import { FETCH_MENU } from '../ActionTypes';

const menuReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MENU:
            return action.payload;
        default:
            return state;
    }
};

export default menuReducer;