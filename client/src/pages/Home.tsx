import UploadPosts from '../components/UploadPosts';
import Post from '../components/Post';

interface HomeProps {
   cookies: { [key: string]: string };
}

export default function Home({ cookies }: HomeProps) {
   return (
      <>
         <div className='home'>
            <UploadPosts cookies={cookies} />
            <Post />
         </div>
      </>
   );
}
