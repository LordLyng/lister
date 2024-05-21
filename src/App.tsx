import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { AppTitleProvider } from "./utils/app-title.context";

export default function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <AppTitleProvider>
          <RouterProvider router={router} />
        </AppTitleProvider>
      </MantineProvider>
    </>
  );
}
