// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmJ57YWZCYXj8DNg8pOzQ2aN90Z7_A948",
  authDomain: "cell-ia.firebaseapp.com",
  projectId: "cell-ia",
  storageBucket: "cell-ia.firebasestorage.app",
  messagingSenderId: "1093276485660",
  appId: "1:1093276485660:web:ec246d1bbec02d115e37d9",
  measurementId: "G-QLT56ED278"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();