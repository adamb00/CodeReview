import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import config from '../utils/config';
import { headers } from '../utils/helper';

import NavProps from '../interfaces/INavProps';

import { AppProvider } from '../contexts/AppContext';
import { LoginProvider } from '../contexts/LoginContext';

export default function Logout({ removeCookie }: NavProps) {
   const { setUser } = useContext(AppProvider);
   const { setIsLoggedIn } = useContext(LoginProvider);
   async function handleLogout() {
      try {
         const res = await axios.get(config.BASE_URL + 'users/logout', { headers: headers({}) });
         if (res.data.status === 'success') {
            setIsLoggedIn(false);
            setUser(new Object());
            removeCookie('jwt');
         }
      } catch (err) {
         console.log(err);
      }
   }
   return (
      <Link className='header-nav__link' to='/' onClick={handleLogout}>
         Log out
      </Link>
   );
}
