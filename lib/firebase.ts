import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCVgDozEtEnz1BWZJfS-0-KkRWntCiNt8Y",
  authDomain: "telcmate.firebaseapp.com",
  projectId: "telcmate",
  storageBucket: "telcmate.firebasestorage.app",
  messagingSenderId: "945468433513",
  appId: "1:945468433513:web:88cc94b0976589a63f6ef8",
  measurementId: "G-ZRG66F2W9R"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, analytics }; 