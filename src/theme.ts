import { MantineColorsTuple, createTheme } from "@mantine/core";

const themeColors: MantineColorsTuple = [
  "#e1faff",
  "#cbf1ff",
  "#9adfff",
  "#64ceff",
  "#3cbffe",
  "#22b5fe",
  "#09b1ff",
  "#009be4",
  "#0089cd",
  "#0077b5",
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  cursorType: "pointer",
  scale: 1.1,
  colors: { themeColors },
});
