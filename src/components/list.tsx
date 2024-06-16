import { Divider, Stack } from "@mantine/core";
import { AppListItem } from "./list-item";
import { Item } from "../firebase/firebase.models";

interface Props {
  items: Item[];
  removeItem: (id: string) => Promise<void>;
  editItem: (item: Item) => Promise<void>;
  deleteItemsOnChecked: boolean;
}

export const AppList = ({
  items,
  removeItem,
  editItem,
  deleteItemsOnChecked,
}: Props) => {
  return (
    <Stack>
      {items.map((item) => (
        <Stack key={item.id}>
          <Divider />
          <AppListItem
            deleteItemsOnChecked={deleteItemsOnChecked}
            item={item}
            removeItem={removeItem}
            editIten={editItem}
          />
        </Stack>
      ))}
    </Stack>
  );
};
