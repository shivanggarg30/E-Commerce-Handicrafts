// FirebaseInit.js
/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, persistentLocalCache, initializeFirestore, persistentSingleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Console log for debugging
console.log("Firebase env vars available:", {
  apiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDXS9UltNJeBzTfS5NPUrHyJFrTx5ytye8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "seller-dashboard-bfc03.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "seller-dashboard-bfc03",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "seller-dashboard-bfc03.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "276359251321",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:276359251321:web:e6250abc40a1e6e1285ba8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-57ESJM89Y2",
};

let firebaseApp;
let auth;
let db;
let storage;

function initializeFirebase() {
  if (firebaseApp) {
    return { app: firebaseApp, auth, db, storage };
  }

  try {
    firebaseApp = initializeApp(firebaseConfig);

    try {
      initializeFirestore(firebaseApp, {
        localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() })
      });
    } catch (firestoreError) {
      console.error("Firestore initialization error:", firestoreError);
    }

    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);

  } catch (error) {
    console.error("Firebase initialization error:", error);
  }

  return { app: firebaseApp, auth, db, storage };
}

export default initializeFirebase;
export { firebaseConfig };
*/