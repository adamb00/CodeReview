import { Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CookieGetOptions } from 'universal-cookie';

import axios from 'axios';

import config from '../../config';
import Button from '../components/Button';

interface LoginProps {
   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
   setCookie: (name: string, value: string, options?: CookieGetOptions) => void;
}

export default function Login({ setIsLoggedIn, setCookie }: LoginProps) {
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleFormSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
      if (e) e.preventDefault();
      try {
         const res = await axios.post(config.BASE_URL + '/users/login', { email, password });

         if (res.data.status === 'success') {
            // setCookie('jwt', res.data.token);
            setIsLoggedIn(true);
            navigate('/');
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <h1 className='heading-primary heading-primary--main'>Code Review</h1>
         <div className='login'>
            <form className='login-form' onSubmit={handleFormSubmit}>
               <div className='login-form__group'>
                  <label htmlFor='email' className='login-form__label'>
                     Your Email
                  </label>
                  <input
                     type='text'
                     name='email'
                     id='email'
                     className='login-form__input'
                     onChange={e => setEmail(e.target.value)}
                     value={email}
                     placeholder='eg. test@test.com'
                  />
               </div>
               <div className='login-form__group'>
                  <label htmlFor='password' className='login-form__label'>
                     Your Password
                  </label>
                  <input
                     type='password'
                     name='password'
                     id='password'
                     className='login-form__input'
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                     placeholder='************'
                  />
               </div>
               <div className='login-form__links'>
                  <Link className='login-form__forgot' to='/'>
                     Forgot your password?
                  </Link>
                  <Link className='login-form__forgot' to='/signup'>
                     Or don't have an account yet?
                  </Link>
               </div>

               <Button text='Login' style='primary' onClick={e => handleFormSubmit(e)} />
            </form>
         </div>
      </>
   );
}
