import {
  AppShell,
  Burger,
  Button,
  Center,
  Container,
  Group,
  Text,
} from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { useFirebaseAuth } from "../firebase/auth.hook";
import { Nav } from "../components/nav";
import { useDisclosure } from "@mantine/hooks";
import { UserInfo } from "../components/user-info";
import { NothingHere } from "../components/nothing-here";
import { ColorSchemeToggle } from "../components/color-scheme-toggle";
import { useAppTitle } from "../utils/app-title.hook";

const Login = () => {
  const { signIn } = useFirebaseAuth();
  return (
    <Center>
      <Button onClick={signIn}>Sign in with Google</Button>
    </Center>
  );
};

export const RootPage = () => {
  const { currentUser, isValidUser } = useFirebaseAuth();
  const [opened, { toggle, close }] = useDisclosure();
  const { title } = useAppTitle();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" wrap="nowrap" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
          <Group wrap="nowrap">
            <Text lineClamp={1}>{title}</Text>
          </Group>
          <Group wrap="nowrap">
            <ColorSchemeToggle />
            <UserInfo />
          </Group>
        </Group>
      </AppShell.Header>
      <Nav close={close} />
      <AppShell.Main>
        <Container>
          {!!currentUser && isValidUser && <Outlet />}
          {!!currentUser && !isValidUser && <NothingHere />}
          {!currentUser && <Login />}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
