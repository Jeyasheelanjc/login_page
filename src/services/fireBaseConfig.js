// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2-9vYPwAZAQJUrOWUyZG6vkndAqakymM",
  authDomain: "registration-form-f80b7.firebaseapp.com",
  projectId: "registration-form-f80b7",
  storageBucket: "registration-form-f80b7.appspot.com",
  messagingSenderId: "244910693813",
  appId: "1:244910693813:web:cb3ef99ef80e3c7a110dfc",
  measurementId: "G-4MD9P0N22M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const dataBase =getAuth(app)
