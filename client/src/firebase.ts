import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx6XLnnE8vW-vJhx3u3C6QtI-M-R4sdME",
  authDomain: "liviz-1b093.firebaseapp.com",
  projectId: "liviz-1b093",
  storageBucket: "liviz-1b093.firebasestorage.app",
  messagingSenderId: "55709877361",
  appId: "1:55709877361:web:55a500a4406b62ccb747d0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
