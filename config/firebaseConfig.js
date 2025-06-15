//firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage"; // Initialize Firebase

// Firebase configuration object
// const firebaseConfig = {
//   apiKey: "AIzaSyACsaf-26cUiE37bou_mZRAZSs1ZSO8EMQ",
//   authDomain: "skillbazaar-a6b11.firebaseapp.com",
//   projectId: "skillbazaar-a6b11",
//   storageBucket: "skillbazaar-a6b11.firebasestorage.app",
//   messagingSenderId: "852457921616",
//   appId: "1:852457921616:android:8047221919761c038d0555",
//   measurementId: "G-SCTVNXY4VJ"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCpbIxvspwDGoz2XQ8dqmDcwZP14sL3DkQ",
  authDomain: "skillbazaar-11488.firebaseapp.com",
  databaseURL: "https://skillbazaar-11488-default-rtdb.firebaseio.com",
  projectId: "skillbazaar-11488",
  storageBucket: "skillbazaar-11488.firebasestorage.app",
  messagingSenderId: "230847820086",
  appId: "1:230847820086:web:58129260ec386fffe8c397",
  measurementId: "G-0HRB0TZ1X3"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
// Use either getAuth or initializeAuth for Firebase Auth
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
//const FIREBASE_AUTH = getAuth(FIREBASE_APP);

const FIREBASE_DB = getFirestore(FIREBASE_APP);
// const FIREBASE_DB = getDatabase(FIREBASE_APP); 

export { FIREBASE_APP, FIREBASE_AUTH,FIREBASE_DB};




// import { initializeApp } from "firebase/app";
// import { getAuth, initializeAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase, ref, set, get } from 'firebase/database';
// import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Firebase configuration object
// const firebaseConfig = {
//   apiKey: "AIzaSyACsaf-26cUiE37bou_mZRAZSs1ZSO8EMQ",
//   authDomain: "skillbazaar-a6b11.firebaseapp.com",
//   projectId: "skillbazaar-a6b11",
//   storageBucket: "skillbazaar-a6b11.firebasestorage.app",
//   messagingSenderId: "852457921616",
//   appId: "1:852457921616:android:8047221919761c038d0555",
//   measurementId: "G-SCTVNXY4VJ"
// };

// const FIREBASE_APP = initializeApp(firebaseConfig);

// // Initialize Firebase Auth and Database
// const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// const FIREBASE_DB = getDatabase(FIREBASE_APP);

// export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };
