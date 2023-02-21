import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDQw8j1ftpRhW2kIa8tJRDA8EYcGQcvcYE",
  authDomain: "surveys-7c45.firebaseapp.com",
  projectId: "surveys-7c45",
  storageBucket: "surveys-7c45.appspot.com",
  messagingSenderId: "161962112221",
  appId: "1:161962112221:web:bd6db8bc6b2805b0499734",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
