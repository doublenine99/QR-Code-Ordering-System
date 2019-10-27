/**
 * all the actions should be create from here
 */
import { koiSushiMenu, koiSushiRestaurant } from '../Firebase/firebase';
import * as ActionTypes from './ActionTypes';

// define menu page actions
export const fetchMenu = () => async dispatch => {
  koiSushiMenu
    .get()
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
};


// define sidebar actions
export const fetchCategories = () => async dispatch => {
  koiSushiRestaurant
    .onSnapshot(docSnapshot => {
      const categories = docSnapshot.data().categories;
      // console.log("Received doc snapshot: " + (docSnapshot.data().categories));
      dispatch({
        type: ActionTypes.FETCH_CATEGORIES,
        payload: categories
      });
    },
      err => {
        console.log(`Encountered error: ${err}`);
      });
};

export const fetchCart = () => async dispatch => {
  koiSushiMenu
  .get()
    .then(snapshot => {
      const cart = snapshot.docs.map(doc => doc.data());
      dispatch({
        type: ActionTypes.FETCH_CART,
        payload: cart
      });
    })
    .catch((err) => {
      console.log('Error fetching cart', err);
    });
  // koiSushiMenu.get()
  //   .then(snapshot => {
  //     dispatch({
  //       type: ActionTypes.FETCH_MENU,
  //       payload: snapshot
  //     });
  //   });
};