// import { useEffect } from 'react';
// import { messaging } from './firebase.config';

// const Notification = () => {
//     useEffect(() => {
//         messaging.requestPermission().then(() => messaging.getToken()).then((token: any) => {
//             console.log('FCM Token:', token);
//         }).catch((err: any) => {
//             console.log('Permission denied', err);
//         });

//         messaging.onMessage((payload: any) => {
//             console.log('Message received. ', payload);
//         });
//     }, []);

//     return null;
// };

// export default Notification;