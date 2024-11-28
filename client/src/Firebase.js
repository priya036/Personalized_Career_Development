import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

let isSigningIn = false; // Prevent multiple sign-ins

export const signInWithGoogle = async () => {
    if (isSigningIn) return; // Prevent multiple calls
    isSigningIn = true;
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Save user details to localStorage
      localStorage.setItem("name", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("profilePic", user.photoURL);
  
      return user; // Return user object
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error; // Propagate the error to the caller
    } finally {
      isSigningIn = false; // Reset flag
    }
  };
  