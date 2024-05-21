import { useCallback, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "./firebase.context";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { Entity } from "./firebase.models";

export const useFirestoreCollection = <TModel extends Entity>(
  collectionName: string
) => {
  const { store } = useContext(FirebaseContext) as FirebaseContext;
  const [data, setData] = useState<TModel[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(store, collectionName), (col) => {
      setData(
        col.docs.map((d) => {
          const data = d.data() as TModel;
          return {
            ...data,
            id: d.id,
          };
        })
      );
    });

    return () => {
      unsub();
    }
  }, [store, setData, collectionName]);

  const addItem = useCallback(
    async <TModel extends Entity>(item: Omit<TModel, "id">) => {
      await addDoc(collection(store, collectionName), item);
    },
    [collectionName, store]
  );

  const editItem = useCallback(
    async <TModel extends Entity>(item: TModel) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...payload } = item;
      await setDoc(doc(store, collectionName, item.id), payload);
    },
    [collectionName, store]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      await deleteDoc(doc(store, collectionName, id));
    },
    [collectionName, store]
  );

  const deleteCollection = useCallback(async () => {
    const batch = writeBatch(store);
    const snapshot = await getDocs(collection(store, collectionName));
    snapshot.forEach((snap) => batch.delete(snap.ref));
    await batch.commit();
  }, [collectionName, store])

  return { data, addItem, editItem, deleteItem, deleteCollection };
};
