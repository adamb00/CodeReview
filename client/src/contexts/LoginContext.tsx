import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface LoginProviderProps {
   children: React.ReactNode;
}
interface LoginContextProps {
   isLoggedIn: boolean;
   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: LoginContextProps = {
   isLoggedIn: false,
   setIsLoggedIn: () => {
      // Placeholder
   },
};

export const LoginProvider = createContext<LoginContextProps>(defaultValue);
export const LoginContext = ({ children }: LoginProviderProps) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   return <LoginProvider.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoginProvider.Provider>;
};
