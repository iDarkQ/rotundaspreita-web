"use client";

import { Subscription, User } from "@/app/generated/prisma/browser";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface NavbarManagerContextProps {
  user?: User;
  subscription: Subscription | null;
  setSubscription: Dispatch<SetStateAction<Subscription | null>>;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

interface NavbarManagerProviderProps {
  subscription: Subscription | null;
  user?: User;
  children: ReactNode;
}

const NavbarManagerContext = createContext<
  NavbarManagerContextProps | undefined
>(undefined);

export const NavbarManagerProvider = ({
  children,
  user,
  subscription: baseSubscription,
}: NavbarManagerProviderProps) => {
  const [expanded, setExpanded] = useState(false);
  const [subscription, setSubscription] = useState(baseSubscription);

  return (
    <NavbarManagerContext.Provider
      value={{
        user,
        subscription,
        setSubscription,
        expanded,
        setExpanded,
      }}
    >
      {children}
    </NavbarManagerContext.Provider>
  );
};

export const useNavbarManager = () => {
  const context = useContext(NavbarManagerContext);

  if (!context) {
    throw Error("useNavbarManager has to be used within NavbarManagerProvider");
  }

  return context;
};
