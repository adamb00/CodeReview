import axios from 'axios';
import { useState, useEffect } from 'react';
import IPost from '../interfaces/IPost';
import config from '../utils/config';
import StarredPostItem from './StarredPostItem';
import Error from './Error';

export default function StarredPost() {
   const [posts, setPosts] = useState<IPost[]>([]);
   useEffect(() => {
      const getMyPosts = async () => {
         try {
            const res = await axios.get(config.BASE_URL + 'users/getFavorites', { withCredentials: true });
            setPosts(res.data.data);
         } catch (err) {
            console.log(err);
         }
      };
      getMyPosts();
   }, []);

   if (posts.length === 0) return <Error> No favorited posts yet.</Error>;
   return (
      <>
         <h3 className='heading-tertiary heading-tertiary--main'>Starred posts</h3>
         {posts.map(post => (
            <StarredPostItem post={post} key={post._id} />
         ))}
      </>
   );
}
