import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZWy_yZ8AnmgX1EULoHbyth_V4XRNP--U",
  authDomain: "barberx-780cd.firebaseapp.com",
  projectId: "barberx-780cd",
  storageBucket: "barberx-780cd.appspot.com",
  messagingSenderId: "279150658236",
  appId: "1:279150658236:web:f0d8479f0a63b482bb46b9",
  measurementId: "G-12G1LJLFP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;