import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase configuration variables loaded from environment variables
const clientCredentials = {
  apiKey: "AIzaSyCedCkVp_-SPu69bGwb06vYNNlQZXqNkTc",
  authDomain: "capstone-database-4ab2d.firebaseapp.com",
  projectId: "capstone-database-4ab2d",
  storageBucket: "capstone-database-4ab2d.appspot.com",
  messagingSenderId: "211022563598",
  appId: "1:211022563598:web:c9aa2189ae2015e64caf5f",
};
const app = initializeApp(clientCredentials);
const auth = getAuth(app);
const db = getFirestore(app);

// If Firebase isn't already initialized, initialize it using the above credentials.

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, logout };
