import { FirebaseApp } from "firebase/app";
import { app } from "./app";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  Auth,
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface FirebaseContext {
  app: FirebaseApp;
  store: Firestore;
  auth: Auth;
  currentUser: User | null;
  isValidUser: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseContext | null>(null);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isValidUser = useMemo(() => {
    if (!currentUser) return false;
    return (
      currentUser.uid === "UrhkUeR9yfQU8gjGpFGc1Ftdvp03" ||
      currentUser.uid === "UTGORXYKwSWe2G6rrw7LVnsZzwH3"
    );
  }, [currentUser]);
  const store = getFirestore(app);
  const auth = getAuth(app);

  const signIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  }, [auth]);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error(err);
    }
  }, [auth]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <FirebaseContext.Provider
      value={{ app, store, auth, currentUser, signOut, signIn, isValidUser }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
