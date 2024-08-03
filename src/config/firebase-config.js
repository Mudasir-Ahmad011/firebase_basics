import { initializeApp } from "firebase/app";
import  {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQ0x2kXRc6Czay6Tt7aFn_oxyLCTR25Z0",
  authDomain: "fir-basics-f724b.firebaseapp.com",
  projectId: "fir-basics-f724b",
  storageBucket: "fir-basics-f724b.appspot.com",
  messagingSenderId: "554996531959",
  appId: "1:554996531959:web:f8492acbc964ff8e5bc9f2",
  measurementId: "G-M2BFNXPWFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(app);
const fireStorage = getStorage(app);

export {auth};
export {googleProvider};
export {fireStore};
export {fireStorage};