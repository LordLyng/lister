import { useContext } from "react";
import { FirebaseContext } from "./firebase.context";

export const useFirebaseAuth = () => {
  const { auth, currentUser, signIn, signOut, isValidUser } = useContext(
    FirebaseContext
  ) as FirebaseContext;

  return { auth, currentUser, signIn, signOut, isValidUser };
};
