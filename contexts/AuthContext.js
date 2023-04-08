import { createContext, useState, useEffect } from "react";
import { auth } from "@/firebase/firebase-config";
import { setData } from "@/firebase/firebase-functions";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState("");

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  }

  async function signOutGoogle() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  const saveUserToDatabase = (user) => {
    setData("users", user.uid, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user?.photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserPhoto(user?.photoURL);
      setLoading(false);

      if (user) {
        saveUserToDatabase(user);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    loading,
    currentUser,
    userPhoto,
    signInWithGoogle,
    signOutGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
