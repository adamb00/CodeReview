import { createContext, useState } from 'react';
import IUser from '../interfaces/IUser';

interface AppProviderProps {
   children: React.ReactNode;
}
interface AppContextProps {
   user: IUser;
   setUser: React.Dispatch<React.SetStateAction<IUser>>;
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
      _id: '',
      favoritePosts: [],
   },
   setUser: () => {
      //Placeholder function
   },
};

export const AppProvider = createContext<AppContextProps>(defaultValue);

export const AppContext = ({ children }: AppProviderProps) => {
   const [user, setUser] = useState<IUser>(defaultValue.user);

   return <AppProvider.Provider value={{ user, setUser }}>{children}</AppProvider.Provider>;
};
