// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_GZTgEhRx5jU-BoHIIke02oAF-c7j1rQ",
  authDomain: "collegeeventsa.firebaseapp.com",
  projectId: "collegeeventsa",
  storageBucket: "collegeeventsa.firebasestorage.app",
  messagingSenderId: "168010964716",
  appId: "1:168010964716:web:4dde8fd792b3eba42fcfc9",
  measurementId: "G-PPDMCZCV6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);