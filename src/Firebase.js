// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxYklzRj-KvDV-WyOVCSFDXrxukzfx2lU",
  authDomain: "reactportfolio-ebf6a.firebaseapp.com",
  databaseURL:"https://reactportfolio-ebf6a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactportfolio-ebf6a",
  storageBucket: "reactportfolio-ebf6a.appspot.com",
  messagingSenderId: "742953195502",
  appId: "1:742953195502:web:7fa7922f611900063c20ff",
  measurementId: "G-4TR2BEG4PL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



export { db };