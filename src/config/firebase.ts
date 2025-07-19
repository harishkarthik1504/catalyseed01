import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDufgVT_gngHYhEZJJ2MZItMiMtx5ovCpU",
  authDomain: "krishna-nagar-association.firebaseapp.com",
  projectId: "krishna-nagar-association",
  storageBucket: "krishna-nagar-association.firebasestorage.app",
  messagingSenderId: "617262177383",
  appId: "1:617262177383:web:60bedbd1c0cddb232348c2",
  measurementId: "G-S0Q5HKW175",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;