import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCO6lMeFI1coZIi45K5SvO72H_2QeOadQM",
  authDomain: "fir-movieinfoapp.firebaseapp.com",
  projectId: "fir-movieinfoapp",
  storageBucket: "fir-movieinfoapp.appspot.com",
  messagingSenderId: "499013067468",
  appId: "1:499013067468:web:cd6b228af10af8200f1869",
  measurementId: "G-SMXBFVV4QB"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
const auth = firebase.auth()

export {auth};
