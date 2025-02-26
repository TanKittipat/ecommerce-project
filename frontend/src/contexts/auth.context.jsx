import { useState, useEffect, createContext } from "react";
import { Cookies } from "react-cookie";
import UserServices from "../services/user.service";
export const AuthContext = createContext();
import app from "../configs/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const cookies = new Cookies();

  const getUser = () => {
    const userInfo = cookies.get("user") || null;

    return userInfo;
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const updateUser = (name, profile) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profile,
    });
  };

  const auth = getAuth(app);

  //   check if user is logged in?
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
        setIsLogin(true);
        const { email } = currentUser;
        const res = await UserServices.signUser({ email: email });
        const { data } = res;
        if (data) {
          console.log(data);
          cookies.set("user", data);
        }
      } else {
        cookies.remove("user");
      }
      setIsLogin(true);
    });
    return unsubscribe;
  }, [auth]);

  const authInfo = {
    user,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUser,
    isLogin,
    getUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
