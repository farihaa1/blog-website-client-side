import { createContext, useEffect, useState } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  GithubAuthProvider,
} from "firebase/auth";
import auth from "../../firebase.init";
import axios from "axios";
export const AuthContext = createContext();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");

      await signOut(auth);
  
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };
  

  const handleGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const handleGithubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const updateUserProfile = async (name, image) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
      setUser((prevUser) => ({
        ...prevUser,
        displayName: name,
        photoURL: image,
      }));
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent!";
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken(true);
          localStorage.setItem("token", idToken);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      } else {

        localStorage.removeItem("token");
      }
  
      setUser(currentUser);
      setLoading(false);
    });
  
    return () => unSubscribe();
  }, []);
  

  const userInfo = {
    user,
    loading,
    setUser,
    createUser,
    loginUser,
    logout,
    updateUserProfile,
    resetPassword,
    setLoading,
    handleGoogleLogin,
    handleGithubLogin,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-ring text-blue-800 w-44 h-34"></span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
