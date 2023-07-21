import { useContext, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostProvider } from '../contexts/PostContext';
import IPost from '../interfaces/IPost';
import axios from 'axios';
import { FiStar } from 'react-icons/fi';
import config from '../utils/config';

interface StarredPostItemProps {
   post: IPost;
}

export default function StarredPostItem({ post }: StarredPostItemProps) {
   const [isFavorite, setIsFavorite] = useState(true);

   const { setPosts } = useContext(PostProvider);
   const { setIsOpened } = useContext(PostProvider);
   const handleSetPost: MouseEventHandler<HTMLAnchorElement> = () => {
      if (setPosts) setPosts([post]);
      setIsOpened(post);
      localStorage.setItem('openedPost', JSON.stringify(post));
   };

   const handleSetFavorite = async () => {
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
   return (
      <div className='starred-post'>
         <FiStar
            className={isFavorite ? 'starred-post__star active' : 'starred-post__star'}
            onClick={handleSetFavorite}
         />
         <h2 className='heading-secondary heading-secondary--main'>{post.title}</h2>
         <div className='starred-post__content'>{post.content}</div>
         <img className='starred-post__photo' src={`http://localhost:5173/${post.photo}`} alt={post.photo} />

         <Link className='starred-post__comments' to='/comments' onClick={handleSetPost}>
            See all comments &rarr;
         </Link>
      </div>
   );
}
