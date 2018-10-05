import * as API from 'api/user';

export default class Messaging {
  static initialize() {
    const getEnv = name => process.env[`REACT_APP_FIREBASE_${name.toUpperCase()}`]

    // Initialize Firebase
    const config = {
      apiKey: getEnv('api_key'),
      authDomain: `${getEnv('project_id')}.firebaseapp.com`,
      databaseURL: `https://${getEnv('project_id')}.firebaseio.com`,
      projectId: getEnv('project_id'),
      storageBucket: `${getEnv('project_id')}.appspot.com`,
      messagingSenderId: getEnv('sender_id')
    };
    let firebase;
    let messaging;
    try {
      firebase = global.firebase;
      firebase.initializeApp(config);
      messaging = firebase.messaging();
    }
    catch (error) {
      console.log(error);
      return false;
    }

    const getToken = overwrite => {
      messaging.getToken().then(currentToken => {
        if (currentToken) {
          API.RegisterFirebaseToken({token: currentToken}).
          catch(errors => {
            console.log(errors.token ? errors.token[0].message : 'Token was not registered');
          })
        } else {
          console.log('No Instance ID token available. Request permission to generate one.');
        }
      })
      .catch(err => {
        console.log('Unable to retrieve token', err);
      });
    };

    messaging.usePublicVapidKey(getEnv('vapid_key'));
    messaging.requestPermission().then(() => {
      console.log('Notification permission granted.');
      getToken(false);
    }).catch(err => {
      console.log('Unable to get permission to notify.', err);
    });

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
      getToken(true);
    });

    messaging.onMessage(payload => {
      console.log('Received message ', payload);
      const notification = payload.notification;
      const data = payload.data;
      const type = payload.data.type;
      data.type = undefined;

      // TODO: display notification

      // treat [data] as [type]
      Messaging.onData(type, data);
    });

    return true;
  }

  static onData(type, data) {
    switch (type) {
      // TODO: implement actions for each type
      default:
    }
  }
}
