import { NavLink } from 'react-router-dom';
import { PropsWithChildren } from 'react';

export default function NavigationDesktop({ children }: PropsWithChildren) {
   return (
      <ul className='header-nav__list'>
         <li className='header-nav__item'>
            <NavLink className='header-nav__link' to='/'>
               Home
            </NavLink>
         </li>
         <li className='header-nav__item'>
            <NavLink className='header-nav__link' to='/about'>
               About
            </NavLink>
         </li>
         <li className='header-nav__item'>
            <NavLink className='header-nav__link' to='/account'>
               Account
            </NavLink>
         </li>
         <li className='header-nav__item'>{children}</li>
      </ul>
   );
}
