import { Link } from 'react-router-dom';
import IPost from '../interfaces/IPost';
import { MouseEventHandler, useContext } from 'react';
import { PostProvider } from '../contexts/PostContext';

interface UserPostItemProps {
   post: IPost;
}

export default function UserPostItem({ post }: UserPostItemProps) {
   const { setPosts } = useContext(PostProvider);
   const { setIsOpened } = useContext(PostProvider);
   const handleSetPost: MouseEventHandler<HTMLAnchorElement> = () => {
      if (setPosts) setPosts([post]);
      setIsOpened(post);
      localStorage.setItem('openedPost', JSON.stringify(post));
   };
   return (
      <div className='user-post'>
         <h2 className='heading-secondary heading-secondary--main'>{post.title}</h2>
         <div className='user-post__content'>{post.content}</div>
         <img className='user-post__photo' src={`http://localhost:5173/${post.photo}`} alt={post.photo} />

         <Link className='post-item__comments' to='/comments' onClick={handleSetPost}>
            See all comments &rarr;
         </Link>
      </div>
   );
}
