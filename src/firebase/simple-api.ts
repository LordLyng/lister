import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { List } from "./firebase.models";
import { app } from "./app";

export const getListDocByCollectionName = async (
  name: string
): Promise<List | null> => {
  const store = getFirestore(app);
  const q = query(
    collection(store, 'lists'),
    where("collectionName", "==", name)
  );
  const snapshot = await getDocs(q);

  if (snapshot.docs.length === 0) return null;

  return {
    ...snapshot.docs[0].data() as List,
    id: snapshot.docs[0].id,
  }
};
