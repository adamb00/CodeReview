import UploadPosts from '../components/UploadPosts';
import Posts from '../components/Posts';

interface HomeProps {
   cookies: { [key: string]: string };
}

export default function Home({ cookies }: HomeProps) {
   return (
      <>
         <div className='home'>
            <UploadPosts cookies={cookies} />
            <Posts cookies={cookies} />
         </div>
      </>
   );
}
