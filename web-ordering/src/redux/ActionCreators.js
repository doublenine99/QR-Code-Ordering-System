/**
 * all the actions should be create from here
 */
// import { koiSushiMenu, koiSushiRestaurant } from '../Firebase/firebase';
import * as ActionTypes from './ActionTypes';

// define menu page actions
// export const fetchMenu = () => async dispatch => {
//   koiSushiMenu.get().then(snapshot => {
//     const menu = snapshot.docs.map(doc => doc.data());
//     // console.log("ready to dispatch menu: " + JSON.stringify(menu)); // array of food
//     dispatch({
//       type: ActionTypes.FETCH_MENU,
//       payload: menu
//     });
//   })
//     .catch((err) => {
//       console.log('Error fetching menu', err);
//     });
// };


// define sidebar actions
// export const fetchCategories = () => async dispatch => {
//   koiSushiRestaurant
//     .onSnapshot(docSnapshot => {
//       const categories = docSnapshot.data().categories;
//       // console.log("Received doc snapshot: " + (docSnapshot.data().categories));
//       dispatch({
//         type: ActionTypes.FETCH_CATEGORIES,
//         payload: categories
//       });
//     },
//       err => {
//         console.log(`Encountered error: ${err}`);
//       });
// };
export const updateCategory = (category) => ({
  type: ActionTypes.UPDATE_CATEGORY,
  payload: category
});

// // define cart page actions
// export const fetchCart = () => async dispatch => {
//   koiSushiRestaurant.collection("tables").doc("t0").collection("cart")
//     .onSnapshot(snapshot => {
//       const cart = snapshot.docs.map(doc => doc.data());
//       // console.log("Received doc snapshot: " + (docSnapshot.data().categories));
//       dispatch({
//         type: ActionTypes.FETCH_CART,
//         payload: cart
//       });
//     },
//       err => {
//         console.log(`Encountered error: ${err}`);
//       });
// }
// // define orderhistory page actions
// export const fetchOrders = () => async dispatch => {
//   koiSushiRestaurant.collection('tables').doc('t0').collection('orders')
//     .onSnapshot(snapshot => {
//       const orders = snapshot.docs.map(doc => doc.data());
//       console.log("Received doc snapshot: ", (orders));
//       dispatch({
//         type: ActionTypes.FETCH_ORDERS,
//         payload: orders
//       });
//     },
//       err => {
//         console.log(`Encountered error: ${err}`);
//       });
// };
