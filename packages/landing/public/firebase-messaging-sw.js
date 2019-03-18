/* eslint-disable */

importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyCRg0En-xj3Ky02oElBV3HogOCZlPEdd30",
  authDomain: "tabb-global.firebaseapp.com",
  databaseURL: "https://tabb-global.firebaseio.com",
  projectId: "tabb-global",
  storageBucket: "tabb-global.appspot.com",
  messagingSenderId: "448538111630"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon-64x64.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
