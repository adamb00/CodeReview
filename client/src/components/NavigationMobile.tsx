import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

interface NavProps {
   handleLogout: () => void;
}

export default function NavigationMobile({ handleLogout }: NavProps) {
   const [isChecked, setIsChecked] = useState(false);

   function handleCheckBox(): void {
      setIsChecked(!isChecked);
   }

   return (
      <div className='navigation'>
         <input type='checkbox' checked={isChecked} className='navigation__checkbox' name='' id='navi-toggle' />
         <label htmlFor='navi-toggle' className='navigation__button' onClick={handleCheckBox}>
            <span className='navigation__icon'>&nbsp;</span>
         </label>
         <div className='navigation__background'>&nbsp;</div>
         <div className='navigation__nav'>
            <ul className='navigation__list'>
               <li className='navigation__item'>
                  <NavLink className='navigation__link' to='/' onClick={handleCheckBox}>
                     Home
                  </NavLink>
               </li>
               <li className='navigation__item'>
                  <NavLink className='navigation__link' to='/about' onClick={handleCheckBox}>
                     About
                  </NavLink>
               </li>
               <li className='navigation__item'>
                  <NavLink className='navigation__link' to='/account' onClick={handleCheckBox}>
                     Account
                  </NavLink>
               </li>
               <li className='navigation__item'>
                  <Link className='navigation__link' to='/' onClick={handleLogout}>
                     Log out
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   );
}
