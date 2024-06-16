import { Checkbox, Flex } from "@mantine/core";
import { EditableText } from "./editable-text";
import { Item } from "../firebase/firebase.models";

interface Props {
  item: Item;
  removeItem: (id: string) => Promise<void>;
  editIten: (item: Item) => Promise<void>;
  deleteItemsOnChecked: boolean;
}

export const AppListItem = ({
  item,
  removeItem,
  editIten,
  deleteItemsOnChecked,
}: Props) => {
  return (
    <Flex
      align="center"
      gap="md"
      flex="1 1 auto"
      opacity={item.checked ? 0.6 : 1}
      style={{ textDecoration: item.checked ? "line-through" : "none" }}
    >
      <Checkbox
        checked={item.checked}
        onChange={(event) => {
          if (deleteItemsOnChecked && event.currentTarget.checked) {
            removeItem(item.id);
          } else {
            editIten({ ...item, checked: event.currentTarget.checked });
          }
        }}
      />
      <EditableText
        text={item.text}
        onEdit={(text) => editIten({ ...item, text })}
      />
    </Flex>
  );
};
