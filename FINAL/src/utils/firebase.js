import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDaM4ecMAaixZSKdPPWdYGLwgsogUXbiz0",
    authDomain: "socialcool-4cf39.firebaseapp.com",
    projectId: "socialcool-4cf39",
    storageBucket: "socialcool-4cf39.appspot.com",
    messagingSenderId: "449589096070",
    appId: "1:449589096070:web:663fa221e7c2df17ccab07"
};

firebase.initializeApp(firebaseConfig);

export default firebase;