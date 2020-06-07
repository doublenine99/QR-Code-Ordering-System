import { initializeApp, firestore } from 'firebase'

var FirebaseConfig = {
    apiKey: "AIzaSyDCjRynXC2ZVa6NcpNfzaMJBq19n_2tOuk",
    authDomain: "qr-code-ordering-system.firebaseapp.com",
    databaseURL: "https://qr-code-ordering-system.firebaseio.com",
    projectId: "qr-code-ordering-system",
    storageBucket: "qr-code-ordering-system.appspot.com",
    messagingSenderId: "1067427070348",
    appId: "1:1067427070348:web:5eb22dab4d460c377756a9",
    measurementId: "G-4PTW2E9CF7"
};
// const FirebaseConfig = {
//     apiKey: "AIzaSyD46bF8s3uwGbYs3AB-HUMqONM5ZX7GK6A",
//     authDomain: "pideapp-a943c.firebaseapp.com",
//     databaseURL: "https://pideapp-a943c.firebaseio.com",
//     projectId: "pideapp-a943c",
//     storageBucket: "pideapp-a943c.appspot.com",
//     messagingSenderId: "694159902085",
//     appId: "1:694159902085:web:c326cc44df9cb34bb430ec",
//     measurementId: "G-23R8V43N2H"
//   };
initializeApp(FirebaseConfig)

const db = firestore();

// export const koiSushiMenu = db.collection("koisushiMenu");
// export const koiSushiRestaurant = db.collection("restaurants").doc("koisushi");
export const restaurants = db.collection("restaurants");
export const database = db;



