// import { getMessaging, getToken, Messaging, isSupported } from "firebase/messaging";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB37ek_hwB_FPUmzn_4E1VqXgTKOKAwedM",
  authDomain: "shubh-exchange.firebaseapp.com",
  projectId: "shubh-exchange",
  storageBucket: "shubh-exchange.firebasestorage.app",
  messagingSenderId: "37110600801",
  appId: "1:37110600801:web:9e01d14f0d797ec6930620",
  measurementId: "G-15LPPK4MT9"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };

// export { messaging, getToken, onMessage };

// const app = initializeApp(firebaseConfig);

// let messaging: Messaging | null = null;

// if (typeof window !== "undefined") {
//   isSupported().then((supported) => {
//     if (supported) {
//       messaging = getMessaging(app);
//     }
//   });
// }

// export const requestNotificationPermission = async () => {
//   try {
//     const status = await Notification.requestPermission();
//     if (status === 'granted') {
//       console.log('Notification permission granted.');
//     } else {
//       console.log('Notification permission denied.');
//     }
//   } catch (error) {
//     console.error('Error requesting notification permission:', error);
//   }
// };

// export const setupOnMessageListener = () => {
//   onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     // Customize notification handling here if needed
//   });
// };

// export { messaging, getToken };
