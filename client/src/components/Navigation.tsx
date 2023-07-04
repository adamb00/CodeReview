import { useLocation } from 'react-router-dom';
import { CookieGetOptions } from 'universal-cookie';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';

import Logo from './Logo';
import axios from 'axios';
import config from '../../config';
import NaviagtionMobile from './NavigationMobile';
import NavigationDesktop from './NavigationDesktop';

interface NavProps {
   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
   removeCookie: (name: string, options?: CookieGetOptions) => void;
}

const Navigation = ({ setIsLoggedIn, removeCookie }: NavProps) => {
   const [isMobile, setIsMobile] = useState(false);

   const { pathname } = useLocation();
   const excludedRoutes = ['/signup'];
   const shouldDisplayNavigation = !excludedRoutes.includes(pathname);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      // Cleanup the event listener on component unmount
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   async function handleLogout() {
      try {
         const res = await axios.get(config.BASE_URL + '/users/logout');
         setIsLoggedIn(false);
         removeCookie('jwt');
         console.log(res);
      } catch (err) {
         console.log(err);
      }
   }

   if (!shouldDisplayNavigation) {
      return null;
   }

   return (
      <>
         <nav className='header-nav'>
            <Logo />
            <h2 className='heading-secondary heading-secondary--main'>CodeReview</h2>
            {!isMobile ? (
               <NavigationDesktop handleLogout={handleLogout} />
            ) : (
               <NaviagtionMobile handleLogout={handleLogout} />
            )}
         </nav>
      </>
   );
};

export default Navigation;
