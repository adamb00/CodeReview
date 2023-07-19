import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../utils/config';
import { headers } from '../utils/helper';
import { useCookies } from 'react-cookie';
import IPost from '../interfaces/IPost';

export default function usePosts() {
   const [posts, setPosts] = useState<IPost[]>();
   const [isLoading, setIsLoading] = useState(false);
   const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

   useEffect(() => {
      const getPosts = async () => {
         try {
            setIsLoading(true);
            const res = await axios.get(config.BASE_URL + 'posts', {
               withCredentials: true,
               headers: headers(cookies),
            });
            if (res.data.status === 'success') {
               setPosts(res.data.data);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setIsLoading(false);
         }
      };
      getPosts();
   }, [cookies]);
   return { posts, setPosts, isLoading, setIsLoading, cookies, setCookie, removeCookie };
}
