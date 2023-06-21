import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/functions';




// import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD_m9CSISWdIhNFQVxadS-SJFrOl2e7-qo",
    authDomain: "smart-home-666d6.firebaseapp.com",
    databaseURL: "https://smart-home-666d6-default-rtdb.firebaseio.com",
    projectId: "smart-home-666d6",
    storageBucket: "smart-home-666d6.appspot.com",
    messagingSenderId: "576689031401",
    appId: "1:576689031401:web:8a036f025f0576d03f0878",
    measurementId: "G-8ETY4662QQ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
firebase.database();
firebase.storage();



export default firebase;
