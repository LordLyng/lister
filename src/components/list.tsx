import { Divider, Stack } from "@mantine/core";
import { AppListItem } from "./list-item";
import { Item } from "../firebase/firebase.models";

interface Props {
  items: Item[];
  removeItem: (id: string) => Promise<void>;
  editItem: (id: string, text: string) => Promise<void>;
}

export const AppList = ({ items, removeItem, editItem }: Props) => {
   return (
    <Stack>
      {items.map((item) => (
        <Stack key={item.id}>
          <Divider />
          <AppListItem
            item={item}
            removeItem={removeItem}
            editIten={editItem}
          />
        </Stack>
      ))}
    </Stack>
  );
};
