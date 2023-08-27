import firebase from "firebase/compat/app";


var firebaseConfig = {
    apiKey: "AIzaSyB0jHNMjt5JhaiDMNY5zyVLemZ85IpsdxU",
    authDomain: "otp-function-f1bf6.firebaseapp.com",
    projectId: "otp-function-f1bf6",
    storageBucket: "otp-function-f1bf6.appspot.com",
    messagingSenderId: "158018589085",
    appId: "1:158018589085:web:9e919de6ca149332215f74"
  };


firebase.initializeApp ({
  firebaseConfig
});
console.log("in firebase")
// Firebase storage reference

export default firebase;