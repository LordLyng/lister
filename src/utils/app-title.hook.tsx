import { useContext } from "react";
import { AppTitleContext } from "./app-title.context";

export const useAppTitle = () => {
  const { title, setTitle } = useContext(AppTitleContext)!;
  return {
    title,
    setTitle,
  };
};
