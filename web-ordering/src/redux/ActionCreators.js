/**
 * all the actions should be create from here
 */
import { koiSushiMenu } from '../Firebase/firebase';
import * as ActionTypes from './ActionTypes';


export const fetchMenu = () => async dispatch => {


  koiSushiMenu.get()
    .then(snapshot => {
      const menu = snapshot.docs.map(doc => doc.data());
      // console.log("ready to dispatch menu: " + JSON.stringify(menu)); // array of food
      dispatch({
        type: ActionTypes.FETCH_MENU,
        payload: menu
      });
    })
    .catch((err) => {
      console.log('Error fetching menu', err);
    });
  // koiSushiMenu.get()
  //   .then(snapshot => {
  //     dispatch({
  //       type: ActionTypes.FETCH_MENU,
  //       payload: snapshot
  //     });
  //   });
};

//TODO: more actions