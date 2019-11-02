
import * as ActionTypes from '../ActionTypes';

const currentCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CATEGORY:
            return action.payload;
        default:
            return 'All';
    }
};
export default currentCategoryReducer;