import firebaseConfig from '@dinify/common/firebaseConfig.json';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

export default firebase;