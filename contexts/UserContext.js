import { createContext, useState, useEffect } from "react";
import {
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { setData } from "@/firebase/firebase-functions";

export const UserContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  async function handleCredentialResponse(response) {
    const credential = GoogleAuthProvider.credential(response.credential);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;
    saveUserToDatabase(user);
  }

  const saveUserToDatabase = (user) => {
    const userInfo = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      token: user.accessToken,
      metadata: {
        createdAt: user.metadata.createdAt,
        creationTime: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastLoginAt,
        lastSignInTime: user.metadata.lastSignInTime,
      },
    };
    setData("users", user.uid, userInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    loading,
    currentUser,
    handleCredentialResponse,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
