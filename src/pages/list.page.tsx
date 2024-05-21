import { useForm } from "react-hook-form";
import { AppList } from "../components/list";
import { useFirestoreCollection } from "../firebase/collection.hook";
import { listRoute } from "../router";
import { Stack, TextInput } from "@mantine/core";
import { Item } from "../firebase/firebase.models";
import { useAppTitle } from "../utils/app-title.hook";
import { useEffect } from "react";

export const ListPage = () => {
  const list = listRoute.useLoaderData()!;
  const { data, deleteItem, editItem } = useFirestoreCollection<Item>(
    list.collectionName
  );
  const { setTitle } = useAppTitle();
  useEffect(() => {
    setTitle(list.name);
  }, [list.name, setTitle]);

  return (
    <Stack>
      <AddItem listName={list.collectionName} />
      <AppList
        items={data}
        removeItem={deleteItem}
        editItem={(id, text) => editItem({ id, text })}
      />
    </Stack>
  );
};

const AddItem = ({ listName }: { listName: string }) => {
  const { addItem } = useFirestoreCollection<Item>(listName);
  const { handleSubmit, register, reset } = useForm<{ text: string }>();

  const onSubmit = (item: { text: string }) => {
    addItem(item);
    reset();
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <TextInput {...register("text")} placeholder="Add new item..." />
    </form>
  );
};
