import * as ActionTypes from '../ActionTypes';


const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CATEGORIES:
            // console.log("menu reduer return: " + JSON.stringify(action.payload));
            return action.payload;
        default:
            return state;
    }
};

export default categoryReducer;
