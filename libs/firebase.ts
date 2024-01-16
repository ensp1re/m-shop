import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdgStm_DwlWv8viC_ovizlyn3XLAbx5Nk",
  authDomain: "matrick-30a46.firebaseapp.com",
  projectId: "matrick-30a46",
  storageBucket: "matrick-30a46.appspot.com",
  messagingSenderId: "482826065393",
  appId: "1:482826065393:web:0da206c6e210891f50e050",
  measurementId: "G-SKFTHPM750"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;