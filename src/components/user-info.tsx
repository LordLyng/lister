import { Avatar, Group, Menu, Text } from "@mantine/core";
import { useFirebaseAuth } from "../firebase/auth.hook";

export const UserInfo = () => {
  const { currentUser, signOut } = useFirebaseAuth();

  if (!currentUser) return <></>;

  return (
    <Menu>
      <Menu.Target>
        <Group>
          <Avatar src={currentUser.photoURL} radius="xl" />
          <Text visibleFrom="md">{currentUser.displayName}</Text>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={signOut}>Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
