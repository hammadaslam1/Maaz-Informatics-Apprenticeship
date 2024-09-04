import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBtpUQZCTDz4eBmmMYRqICYhtpqHgqJkZ8",
    authDomain: "hammad-otp-generator.firebaseapp.com",
    projectId: "hammad-otp-generator",
    storageBucket: "hammad-otp-generator.appspot.com",
    messagingSenderId: "126768776650",
    appId: "1:126768776650:web:fe08c1cd9ff8c36c38bb33",
    measurementId: "G-0NWT3B1WYT"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
