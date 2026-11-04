"use client";

import { Subscription } from "@/app/generated/prisma/browser";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface NavbarManagerContextProps {
  user?: NavbarUser;
  hasPassword: boolean;
  setHasPassword: Dispatch<SetStateAction<boolean>>;
  subscription: Subscription | null;
  setSubscription: Dispatch<SetStateAction<Subscription | null>>;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

export interface NavbarUser {
  id: string;
  email: string;
  name: string;
  admin: boolean;
  isGoogleAccount: boolean;
  hasPassword: boolean;
}

interface NavbarManagerProviderProps {
  subscription: Subscription | null;
  user?: NavbarUser;
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
  const [hasPassword, setHasPassword] = useState(user?.hasPassword ?? false);

  useEffect(() => {
    setSubscription(baseSubscription);
  }, [baseSubscription]);

  useEffect(() => {
    setHasPassword(user?.hasPassword ?? false);
  }, [user?.hasPassword]);

  return (
    <NavbarManagerContext.Provider
      value={{
        user,
        hasPassword,
        setHasPassword,
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
