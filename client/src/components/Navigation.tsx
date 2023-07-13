import { useLocation } from 'react-router-dom';
import { useState, useEffect, PropsWithChildren } from 'react';

import Logo from './Logo';
import NaviagtionMobile from './NavigationMobile';
import NavigationDesktop from './NavigationDesktop';
import { excludedRoutes } from '../utils/helper';

export default function Navigation({ children }: PropsWithChildren) {
   const [isMobile, setIsMobile] = useState(false);
   const { pathname } = useLocation();

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

   if (!shouldDisplayNavigation) {
      return null;
   }

   return (
      <>
         <nav className='header-nav'>
            <Logo />
            <h2 className='heading-secondary heading-secondary--main'>CodeReview</h2>
            {!isMobile ? (
               <NavigationDesktop>{children}</NavigationDesktop>
            ) : (
               <NaviagtionMobile> {children}</NaviagtionMobile>
            )}
         </nav>
      </>
   );
}
