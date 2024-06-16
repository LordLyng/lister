import {
  ActionIcon,
  AppShellNavbar,
  AppShellSection,
  Button,
  Center,
  Divider,
  Group,
  Modal,
  NavLink,
  Popover,
  ScrollArea,
  Stack,
  Switch,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import {
  Link,
  useNavigate,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useFirebaseAuth } from "../firebase/auth.hook";
import { useFirestoreCollection } from "../firebase/collection.hook";
import { useForm } from "react-hook-form";
import { List } from "../firebase/firebase.models";
import { useCallback } from "react";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

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
            <ListSettings list={list} />
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

const ListSettings = ({ list }: { list: List }) => {
  const { editItem } = useFirestoreCollection("lists");
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  return (
    <>
      <Modal opened={opened} onClose={close} title="List Settings">
        <Stack>
          <Switch
            checked={list.deleteOnChecked}
            onChange={(event) => {
              editItem({
                ...list,
                deleteOnChecked: event.currentTarget.checked,
              });
              router.invalidate();
            }}
            label="Delete items when checked?"
            labelPosition="left"
          />
          <DeleteList list={list} />
        </Stack>
      </Modal>

      <ActionIcon variant="default" onClick={open}>
        <IconSettings />
      </ActionIcon>
    </>
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
        <Button color={theme.colors.red[7]}>Delete list</Button>
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
