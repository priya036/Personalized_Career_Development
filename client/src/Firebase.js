import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDSbL9Kzi1fjAdSeYn3JTjQGATyQ9lra-U",
  authDomain: "auth-db8ed.firebaseapp.com",
  projectId: "auth-db8ed",
  storageBucket: "auth-db8ed.firebasestorage.app",
  messagingSenderId: "760666854495",
  appId: "1:760666854495:web:bfed2df001cbdd3a9077ea"
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
  