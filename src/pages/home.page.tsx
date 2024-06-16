import { useFirestoreCollection } from "../firebase/collection.hook";
import { AppList } from "../components/list";
import { useForm } from "react-hook-form";
import { Stack, TextInput } from "@mantine/core";
import { Item } from "../firebase/firebase.models";
import { useAppTitle } from "../utils/app-title.hook";

export const HomePage = () => {
  const { data, deleteItem, editItem } =
    useFirestoreCollection<Item>("indkoeb");
  const { setTitle } = useAppTitle();
  setTitle("Indkøb");

  return (
    <Stack>
      <AddItem />
      <AppList
        deleteItemsOnChecked={true}
        items={data}
        removeItem={deleteItem}
        editItem={(item) => editItem(item)}
      />
    </Stack>
  );
};

const AddItem = () => {
  const { addItem } = useFirestoreCollection<Item>("indkoeb");
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
