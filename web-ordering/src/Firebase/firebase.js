import * as firebase from 'firebase'

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
firebase.initializeApp(FirebaseConfig)

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
export const koiSushiMenu = db.collection("koisushiMenu");
// const databaseRef = firebase.database().ref();
// export const menuRef = databaseRef.child("menu").child("koisushi")


// import app from 'firebase/app';

// var config = {
//     apiKey: "AIzaSyDCjRynXC2ZVa6NcpNfzaMJBq19n_2tOuk",
//     authDomain: "qr-code-ordering-system.firebaseapp.com",
//     databaseURL: "https://qr-code-ordering-system.firebaseio.com",
//     projectId: "qr-code-ordering-system",
//     storageBucket: "qr-code-ordering-system.appspot.com",
//     messagingSenderId: "1067427070348",
//     appId: "1:1067427070348:web:5eb22dab4d460c377756a9",
//     measurementId: "G-4PTW2E9CF7"
// };
// // // Initialize Firebase
// // firebase.initializeApp(firebaseConfig);
// // firebase.analytics();



// class Firebase {
//     constructor() {
//         app.initializeApp(config);
//     }
// }
// export default Firebase;