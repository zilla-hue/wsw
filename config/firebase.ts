// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjEm5QXAuBTVAc30Eig-XpgXPDyqkQF4Y",
  authDomain: "when-sinners-worship.firebaseapp.com",
  projectId: "when-sinners-worship",
  storageBucket: "when-sinners-worship.firebasestorage.app",
  messagingSenderId: "64288155969",
  appId: "1:64288155969:web:cacd7abdaf12042db8d9c0",
  measurementId: "G-NHJWRS8KRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);