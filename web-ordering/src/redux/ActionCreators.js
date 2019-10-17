/**
 * all the actions should be create from here
 */
import {menuRef} from '../Firebase/firebase';
import * as ActionTypes from './ActionTypes';


export const fetchMenu = () => async dispatch => {
  menuRef.on("value", snapshot => {
    dispatch({
      type: ActionTypes.FETCH_MENU,
      payload: snapshot.val()
    });
  });
};

//TODO: more actions