// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6JOH8mp2JwqF-o_f_4ERIY3U28NEFvlQ",
  authDomain: "otp-verification-fc844.firebaseapp.com",
  projectId: "otp-verification-fc844",
  storageBucket: "otp-verification-fc844.appspot.com",
  messagingSenderId: "875328951532",
  appId: "1:875328951532:web:75a3ae1523778afdf8c1c9",
  measurementId: "G-MVR81RLK8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;