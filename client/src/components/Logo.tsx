import { Link } from 'react-router-dom';

export default function Logo() {
   return (
      <Link to='/'>
         <img src='/logo.png' alt='CodeReview logo' className='logo' />
      </Link>
   );
}
