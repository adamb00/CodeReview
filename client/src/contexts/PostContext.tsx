import { Dispatch, SetStateAction, createContext, useState } from 'react';
import IPost from '../interfaces/IPost';

interface PostProviderProps {
   children: React.ReactNode;
}
interface PostContextProps {
   posts: IPost[];
   setPosts: Dispatch<SetStateAction<IPost[]>>;
   isOpened: IPost;
   setIsOpened: Dispatch<SetStateAction<IPost>>;
}

const defaultValue: PostContextProps = {
   posts: [],
   isOpened: {
      title: '',
      photo: '',
      content: '',
      user: '',
      createdAt: new Date(Date.now()),
      _id: '',
   },
   setIsOpened: () => {
      // Placeholder
   },
   setPosts: () => {
      // Placeholder
   },
};

export const PostProvider = createContext<PostContextProps>(defaultValue);
export const PostContext = ({ children }: PostProviderProps) => {
   const [posts, setPosts] = useState<IPost[]>(defaultValue.posts);
   const [isOpened, setIsOpened] = useState<IPost>(defaultValue.isOpened);

   return <PostProvider.Provider value={{ posts, setPosts, isOpened, setIsOpened }}>{children}</PostProvider.Provider>;
};
