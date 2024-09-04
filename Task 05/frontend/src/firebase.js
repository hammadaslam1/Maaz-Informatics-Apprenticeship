// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOKFTmyjmUsImrjaudaL188JEYP0NWRzE",
  authDomain: "maaz-informatics-tasks.firebaseapp.com",
  projectId: "maaz-informatics-tasks",
  storageBucket: "maaz-informatics-tasks.appspot.com",
  messagingSenderId: "634476795633",
  appId: "1:634476795633:web:3fed9336bcd6bd73d77b50",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
