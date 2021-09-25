import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAsgbNLZWqse8Kn1qRwOxlB_c6zVNDy1JY",
  authDomain: "todo-react-redux-ebfcc.firebaseapp.com",
  projectId: "todo-react-redux-ebfcc",
  storageBucket: "todo-react-redux-ebfcc.appspot.com",
  messagingSenderId: "816034570174",
  appId: "1:816034570174:web:31896b1777b982598b63ef",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
