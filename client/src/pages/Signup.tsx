import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import config from '../../config';
import Button from '../components/Button';

export default function Login() {
   const navigate = useNavigate();
   const [lastName, setLastName] = useState('');
   const [firstName, setFirstName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');

   const handleFormSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
      e.preventDefault();
      try {
         const res = await axios.post(config.BASE_URL + '/users/signup', {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
         });
         if (res.data.status === 'success') {
            console.log('success');
            navigate('/');
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <h1 className='heading-primary heading-primary--main'>Code Review</h1>
         <div className='signup'>
            <form className='signup-form' onSubmit={handleFormSubmit}>
               <div className='signup-form__container'>
                  <div className='signup-form__container--group'>
                     <label htmlFor='firstName' className='signup-form__label'>
                        Your First Name
                     </label>
                     <input
                        id='firstName'
                        type='text'
                        name='firstName'
                        className='signup-form__input'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder='Adam'
                     />
                  </div>
                  <div className='signup-form__container--group'>
                     <label htmlFor='lastName' className='signup-form__label'>
                        Your Last Name
                     </label>
                     <input
                        id='lastName'
                        type='text'
                        name='lastName'
                        className='signup-form__input'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        placeholder='Smith'
                     />
                  </div>
               </div>
               <div className='signup-form__group'>
                  <label htmlFor='email' className='signup-form__label'>
                     Your Email
                  </label>
                  <input
                     id='email'
                     type='text'
                     name='email'
                     className='signup-form__input'
                     onChange={e => setEmail(e.target.value)}
                     value={email}
                     placeholder='eg. test@test.com'
                  />
               </div>
               <div className='signup-form__group'>
                  <label htmlFor='password' className='signup-form__label'>
                     Your Password
                  </label>
                  <input
                     id='password'
                     type='password'
                     name='password'
                     className='signup-form__input'
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                     placeholder='************'
                  />
               </div>
               <div className='signup-form__group'>
                  <label htmlFor='passwordAgain' className='signup-form__label'>
                     Your Password Again
                  </label>
                  <input
                     id='passwordAgain'
                     type='password'
                     name='passwordAgain'
                     className='signup-form__input'
                     onChange={e => setPasswordConfirm(e.target.value)}
                     value={passwordConfirm}
                     placeholder='************'
                  />
               </div>

               <Button text='Sign up' style='primary' onClick={e => handleFormSubmit(e)} />
            </form>
         </div>
      </>
   );
}
