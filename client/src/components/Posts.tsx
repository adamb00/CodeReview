import usePosts from '../hooks/usePosts';

import PostItem from './PostItem';
import Spinner from './Spinner';

interface PostsProps {
   cookies: { [key: string]: string };
}

export default function Posts({ cookies }: PostsProps) {
   const { posts } = usePosts();

   if (!posts) return <Spinner />;

   return (
      <>
         {posts.map(post => (
            <PostItem post={post} key={post._id} cookies={cookies} />
         ))}
      </>
   );
}
