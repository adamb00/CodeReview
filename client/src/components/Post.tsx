import usePosts from '../hooks/usePosts';
import IPost from '../interfaces/IPost';

import PostItem from './PostItem';
import Spinner from './Spinner';

export default function Post() {
   const { posts } = usePosts();

   if (!posts) return <Spinner />;

   return (
      <>
         {posts.map((post: IPost) => (
            <PostItem post={post} key={post._id} linkToComments={true} />
         ))}
      </>
   );
}
