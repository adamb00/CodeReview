import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import IPost from '../interfaces/IPost';
import PostComments from './PostComments';
import axios from 'axios';
import config from '../utils/config';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { AppProvider } from '../contexts/AppContext';

interface PostItemProps {
   post: IPost;
   cookies: { [key: string]: string };
}

export default function PostItem({ post }: PostItemProps) {
   const [content, setContent] = useState<string>('');
   const [isFavorite, setIsFavorite] = useState(false);
   const { user } = useContext(AppProvider);

   useEffect(() => {
      const isPostFavorite = user.favoritePosts.includes(post._id);
      setIsFavorite(isPostFavorite);
   }, [post._id, user.favoritePosts]);

   const handleClick = async () => {
      try {
         const res = await axios.patch(
            config.BASE_URL + 'users/addToFavorites',
            { post: post._id },
            {
               withCredentials: true,
            }
         );
         setIsFavorite(isFavorite => !isFavorite);
         console.log(res);
      } catch (err) {
         console.log(err);
      }
   };

   const handleSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
      e.preventDefault();
      try {
         console.log(content);
         const res = await axios.post(
            config.BASE_URL + `posts/${post._id}/comment`,
            { content },
            {
               withCredentials: true,
            }
         );
         console.log(res);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className='post-item' id={post._id}>
         <FiStar className={isFavorite ? 'post-item__star active' : 'post-item__star'} onClick={handleClick} />
         <h2 className='heading-secondary heading-secondary--main'>{post.title}</h2>
         <div className='post-item__content'>{post.content}</div>
         <img className='post-item__photo' src={post.photo} alt={post.photo} />

         <PostComments handleSubmit={handleSubmit} setContent={setContent} post={post} />
         <Link className='post-item__comments' to='comments'>
            See all comments &rarr;
         </Link>
      </div>
   );
}
