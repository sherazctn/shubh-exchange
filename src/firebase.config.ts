import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB37ek_hwB_FPUmzn_4E1VqXgTKOKAwedM",
  authDomain: "shubh-exchange.firebaseapp.com",
  projectId: "shubh-exchange",
  storageBucket: "shubh-exchange.appspot.com",
  messagingSenderId: "37110600801",
  appId: "1:37110600801:web:9e01d14f0d797ec6930620",
  measurementId: "G-15LPPK4MT9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;