import PostItem from '../components/PostItem';

export default function CommentPage() {
   const opened = localStorage.getItem('openedPost');

   return <div className='comments'>{opened && <PostItem post={JSON.parse(opened)} linkToComments={false} />}</div>;
}
