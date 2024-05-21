import { ReactNode, createContext, useState } from "react";

interface AppTitleContext {
  title: string;
  setTitle: (title: string) => void;
}

export const AppTitleContext = createContext<AppTitleContext | null>(null);

interface Props {
  children: ReactNode;
}

export const AppTitleProvider = ({ children }: Props) => {
  const [appTitle, setAppTitle] = useState("Lister");
  return (
    <AppTitleContext.Provider
      value={{ title: appTitle, setTitle: setAppTitle }}
    >
      {children}
    </AppTitleContext.Provider>
  );
};
