import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import PostComments from './PostComments';
import axios from 'axios';
import config from '../utils/config';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { AppProvider } from '../contexts/AppContext';
import CommentsList from './CommentsList';
import { PostProvider } from '../contexts/PostContext';
import IPost from '../interfaces/IPost';

interface PostItemProps {
   post: IPost;
   linkToComments: boolean;
}

export default function PostItem({ post, linkToComments = false }: PostItemProps) {
   const [content, setContent] = useState<string>('');
   const [isFavorite, setIsFavorite] = useState(false);
   const { user } = useContext(AppProvider);
   const { setPosts } = useContext(PostProvider);
   const { setIsOpened } = useContext(PostProvider);

   useEffect(() => {
      const isPostFavorite = user.favoritePosts.includes(post._id);
      setIsFavorite(isPostFavorite);
   }, [post._id, user.favoritePosts]);

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

   const handleSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
      e.preventDefault();
      try {
         const res = await axios.post(
            config.BASE_URL + `posts/${post._id}/comment`,
            { content },
            {
               withCredentials: true,
            }
         );
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className='post-item' id={post._id}>
         <FiStar className={isFavorite ? 'post-item__star active' : 'post-item__star'} onClick={handleSetFavorite} />
         <h2 className='heading-secondary heading-secondary--main'>{post.title}</h2>
         <div className='post-item__content'>{post.content}</div>
         <img className='post-item__photo' src={post.photo} alt={post.photo} />

         {!linkToComments && <CommentsList id={post._id} />}
         <PostComments handleSubmit={handleSubmit} setContent={setContent} />
         {linkToComments && (
            <Link className='post-item__comments' to='comments' onClick={handleSetPost}>
               See all comments &rarr;
            </Link>
         )}
      </div>
   );
}
