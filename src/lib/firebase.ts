// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBks93Ji4ZMFKOhFsjoHvVpTRm_3lQ_tVM",
  authDomain: "devatdeakin-4b509.firebaseapp.com",
  projectId: "devatdeakin-4b509",
  storageBucket: "devatdeakin-4b509.appspot.com",
  messagingSenderId: "522434900619",
  appId: "1:522434900619:web:3b6f2a4b5221a85d129a8e",
};

// Prevent re-initialising if already initialised
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
