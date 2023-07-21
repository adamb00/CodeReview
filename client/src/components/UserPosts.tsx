import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../utils/config';
import IPost from '../interfaces/IPost';
import UserPostItem from './UserPostItem';

export default function UserPosts() {
   const [posts, setPosts] = useState<IPost[]>([]);
   useEffect(() => {
      const getMyPosts = async () => {
         try {
            const res = await axios.get(config.BASE_URL + 'posts/myPosts', { withCredentials: true });
            setPosts(res.data.data);
         } catch (err) {
            console.log(err);
         }
      };
      getMyPosts();
   }, []);

   return (
      <>
         <h3 className='heading-tertiary heading-tertiary--main'>Your posts</h3>
         {posts.map(post => (
            <UserPostItem post={post} key={post._id} />
         ))}
      </>
   );
}
