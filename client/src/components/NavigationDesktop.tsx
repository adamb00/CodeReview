import { Link, NavLink } from 'react-router-dom';

interface NavProps {
   handleLogout: () => void;
}

export default function NavigationDesktop({ handleLogout }: NavProps) {
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
         <li className='header-nav__item'>
            <Link className='header-nav__link' to='/' onClick={handleLogout}>
               Log out
            </Link>
         </li>
      </ul>
   );
}
