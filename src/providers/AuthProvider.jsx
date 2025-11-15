import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";
import { axiosPublic } from "../axios/axiosPublic.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Sign-in (for both login & register)
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;

      const userInfo = {
        id: loggedUser?.uid,
        name: loggedUser?.displayName,
        email: loggedUser?.email,
        photoURL: loggedUser?.photoURL,
      };

      setUser(userInfo);

      // Save user to backend (Mongo)
      const res = await axiosPublic.post("/users", { userInfo });
      if (res.data) {
        // Force token refresh to get custom claims immediately
        await loggedUser.getIdToken(true);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Watch for auth changes and extract custom claims (like role)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          // Force refresh token to ensure latest claims
          const tokenResult = await currentUser.getIdTokenResult(true);
          const role = tokenResult?.claims?.role || "user"; // fallback default

          setUser({
            id: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            role, // ✅ include role from custom claims
          });
        } catch (err) {
          console.error("Error fetching user token claims:", err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
