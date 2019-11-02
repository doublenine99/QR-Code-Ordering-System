import * as ActionTypes from '../ActionTypes';


export const categoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CATEGORIES:
            // console.log("menu reduer return: " + JSON.stringify(action.payload));
            return action.payload;

        default:
            return state;
    }
};

export default categoriesReducer;
