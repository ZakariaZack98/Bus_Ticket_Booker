// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpJumv148HCP1jgK8Dsz7IlUqX6-J3XK0",
  authDomain: "bus-ticket-booker.firebaseapp.com",
  projectId: "bus-ticket-booker",
  storageBucket: "bus-ticket-booker.firebasestorage.app",
  messagingSenderId: "385711824074",
  appId: "1:385711824074:web:e5a07f4ee33dfd2599e833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app