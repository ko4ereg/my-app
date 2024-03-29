// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

export const firebaseConfig = {

  apiKey: "AIzaSyAVJEAI4emdfglAYPPhAAI-niHA3jonp8Y",

  authDomain: "beauty-blog-d2901.firebaseapp.com",

  databaseURL: "https://beauty-blog-d2901-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "beauty-blog-d2901",

  storageBucket: "beauty-blog-d2901.appspot.com",

  messagingSenderId: "2071023918",

  appId: "1:2071023918:web:dd604236914d26b913eabf"

};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 
const auth = getAuth(app, {
  experimentalAutoDetectLongPolling: true,
  experimentalForceLongPolling: true
});
 