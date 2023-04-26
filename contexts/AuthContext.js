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

  function showBrowserAlertOnce() {
    const isAlertShown = sessionStorage.getItem("alertShown");
    if (!isAlertShown) {
      alert(
        "請以網路瀏覽器 (Chrome, Safari...) 而非 app 內建瀏覽器開啟這個網頁，才能成功使用 Google 登入！"
      );
      sessionStorage.setItem("alertShown", "true");
    }
  }

  async function signInWithGoogle() {
    try {
      showBrowserAlertOnce();
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
