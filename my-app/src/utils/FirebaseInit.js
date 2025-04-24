// FirebaseInit.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase"; // Corrected path

let firebaseApp;
function initializeFirebase() {
  if (firebaseApp) {
    return firebaseApp;
  }
  try {
    firebaseApp = initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
  return firebaseApp;
}

// Export initializeFirebase so that firebase is only called once.
export default initializeFirebase;