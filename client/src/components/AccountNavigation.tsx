import { NavLink } from 'react-router-dom';

export default function AccountNavigation() {
   return (
      <nav className='account-nav'>
         <ul className='account-nav__list'>
            <li className='account-nav__item'>
               <NavLink className='account-nav__link' to='personal'>
                  Personal
               </NavLink>
            </li>
            <li className='account-nav__item'>
               <NavLink className='account-nav__link' to='security'>
                  Security
               </NavLink>
            </li>
            <li className='account-nav__item'>
               <NavLink className='account-nav__link' to='posts'>
                  Posts
               </NavLink>
            </li>
         </ul>
      </nav>
   );
}
