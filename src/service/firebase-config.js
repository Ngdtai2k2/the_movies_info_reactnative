import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_inJKysA1pwEtbYmyEAfj7g4aCU-KDEQ",
  authDomain: "themoviesdetails.firebaseapp.com",
  projectId: "themoviesdetails",
  storageBucket: "themoviesdetails.appspot.com",
  messagingSenderId: "327666428626",
  appId: "1:327666428626:web:e771879e6d935ad9331b0b",
  measurementId: "G-QMNQGYLM1E"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
const auth = firebase.auth()

export {auth};
