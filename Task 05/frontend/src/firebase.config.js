import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOKFTmyjmUsImrjaudaL188JEYP0NWRzE",
  authDomain: "maaz-informatics-tasks.firebaseapp.com",
  projectId: "maaz-informatics-tasks",
  storageBucket: "maaz-informatics-tasks.appspot.com",
  messagingSenderId: "634476795633",
  appId: "1:634476795633:web:3fed9336bcd6bd73d77b50",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
