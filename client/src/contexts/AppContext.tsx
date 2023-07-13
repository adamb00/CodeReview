import { createContext, useState } from 'react';
import User from '../interfaces/IUser';

interface AppProviderProps {
   children: React.ReactNode;
}
interface AppContextProps {
   user: User;
   setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultValue: AppContextProps = {
   user: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      photo: 'default.jpg',
      active: false,
   },
   setUser: () => {
      //Placeholder function
   },
};

export const AppProvider = createContext<AppContextProps>(defaultValue);

export const AppContext = ({ children }: AppProviderProps) => {
   const [user, setUser] = useState<User>(defaultValue.user);

   return <AppProvider.Provider value={{ user, setUser }}>{children}</AppProvider.Provider>;
};
