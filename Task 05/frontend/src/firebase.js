// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtpUQZCTDz4eBmmMYRqICYhtpqHgqJkZ8",
  authDomain: "hammad-otp-generator.firebaseapp.com",
  projectId: "hammad-otp-generator",
  storageBucket: "hammad-otp-generator.appspot.com",
  messagingSenderId: "126768776650",
  appId: "1:126768776650:web:fe08c1cd9ff8c36c38bb33",
  measurementId: "G-0NWT3B1WYT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
