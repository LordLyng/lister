import { Checkbox, Flex } from "@mantine/core";
import { EditableText } from "./editable-text";
import { Item } from "../firebase/firebase.models";

interface Props {
  item: Item;
  removeItem: (id: string) => Promise<void>;
  editIten: (id: string, text: string) => Promise<void>;
}

export const AppListItem = ({ item, removeItem, editIten }: Props) => {
  return (
    <Flex align="center" gap="md" flex="1 1 auto">
      <Checkbox
        onChange={(event) => {
          if (event.currentTarget.checked) {
            removeItem(item.id);
          }
        }}
      />
      <EditableText text={item.text} onEdit={(text) => editIten(item.id, text)} />
    </Flex>
  );
};
