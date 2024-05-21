import {
  ActionIcon,
  AppShellNavbar,
  AppShellSection,
  Button,
  Center,
  Divider,
  Group,
  NavLink,
  Popover,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useFirebaseAuth } from "../firebase/auth.hook";
import { useFirestoreCollection } from "../firebase/collection.hook";
import { useForm } from "react-hook-form";
import { List } from "../firebase/firebase.models";
import { useCallback } from "react";
import { IconTrash } from "@tabler/icons-react";

export const Nav = ({ close }: { close: () => void }) => {
  const { isValidUser } = useFirebaseAuth();
  const { data } = useFirestoreCollection<List>("lists");
  const { resolvedLocation } = useRouterState();

  if (!isValidUser)
    return (
      <Center>
        <Text>There's nothing for you here</Text>
      </Center>
    );

  return (
    <AppShellNavbar p="md">
      <AppShellSection>
        <NavLink
          key="indkoeb"
          label="Indkøb"
          to="/"
          component={Link}
          active={resolvedLocation.href === "/"}
          onClick={close}
        />
        <Divider />
      </AppShellSection>
      <AppShellSection grow my="md" component={ScrollArea}>
        {data.map((list) => (
          <Group key={list.collectionName} wrap="nowrap">
            <NavLink
              label={list.name}
              component={Link}
              to="/list/$listName"
              params={{ listName: list.collectionName }}
              active={resolvedLocation.href === `/list/${list.collectionName}`}
              onClick={close}
            />
            <DeleteList list={list} />
          </Group>
        ))}
      </AppShellSection>
      <AppShellSection>
        <AddNewList />
      </AppShellSection>
    </AppShellNavbar>
  );
};

const AddNewList = () => {
  const { addItem } = useFirestoreCollection<List>("lists");
  const { handleSubmit, register, reset } = useForm<{ name: string }>();

  const onSubmit = ({ name }: { name: string }) => {
    const payload: Partial<List> = {
      name,
      collectionName: name
        .toLowerCase()
        .replace("æ", "ae")
        .replace("ø", "oe")
        .replace("å", "aa")
        .trim()
        .replace(" ", "-"),
      locked: false,
    };
    addItem(payload);
    reset();
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <TextInput {...register("name")} placeholder="Add new list..." />
    </form>
  );
};

const DeleteList = ({ list }: { list: List }) => {
  const { deleteCollection } = useFirestoreCollection(list.collectionName);
  const { deleteItem } = useFirestoreCollection("lists");
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const deleteList = useCallback(async () => {
    await deleteCollection();
    await deleteItem(list.id);
    navigate({ to: "/" });
  }, [deleteCollection, deleteItem, list.id, navigate]);

  return (
    <Popover trapFocus width={300}>
      <Popover.Target>
        <ActionIcon variant="default" onClick={deleteList}>
          <IconTrash />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Text>Are you sure you wnat to delete the list "{list.name}"?</Text>
          <Button color={theme.colors.red[7]} onClick={deleteList}>
            Delete
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
