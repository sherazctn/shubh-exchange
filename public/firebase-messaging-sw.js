// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "AIzaSyB37ek_hwB_FPUmzn_4E1VqXgTKOKAwedM",
  authDomain: "shubh-exchange.firebaseapp.com",
  projectId: "shubh-exchange",
  storageBucket: "shubh-exchange.firebasestorage.app",
  messagingSenderId: "37110600801",
  appId: "1:37110600801:web:9e01d14f0d797ec6930620",
  measurementId: "G-15LPPK4MT9"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
