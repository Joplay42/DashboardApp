import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGsM5GMCIhND4AZr54DEZXJ9zxg_4vmQU",
  authDomain: "dashboardapp-5c6f6.firebaseapp.com",
  projectId: "dashboardapp-5c6f6",
  storageBucket: "dashboardapp-5c6f6.appspot.com",
  messagingSenderId: "11828793226",
  appId: "1:11828793226:web:f7df9ac94482c87cbf0273",
  measurementId: "G-M5PPBWWE7V",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
