import { ChangeEvent, PropsWithChildren, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppProvider } from '../contexts/AppContext';
import FormProps from '../interfaces/IFormProps';
import { LoginProvider } from '../contexts/LoginContext';

export default function Form({
   className,
   links = false,
   name = false,
   email = false,
   photo = false,
   password = false,
   passwordConfirm = false,
   newPassword = false,
   setFirstName,
   setLastName,
   setEmail,
   setPassword,
   setPasswordConfirm,
   handleForgotPassword,
   setNewPassword,
   children,
}: PropsWithChildren<FormProps>) {
   const { user, setUser } = useContext(AppProvider);
   const { isLoggedIn } = useContext(LoginProvider);

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, files } = e.target;

      if (name === 'photo' && files) {
         setUser(prevUser => ({
            ...prevUser,
            photo: files[0],
         }));
      } else {
         setUser(prevUser => ({
            ...prevUser,
            [name]: value,
         }));
      }

      if (name === 'firstName' && setFirstName) {
         setFirstName(value);
      } else if (name === 'lastName' && setLastName) {
         setLastName(value);
      } else if (name === 'email' && setEmail) {
         setEmail(value);
      } else if (name === 'password' && setPassword) {
         setPassword(value);
      } else if (name === 'passwordAgain' && setPasswordConfirm) {
         setPasswordConfirm(value);
      } else if (name === 'newPassword' && setNewPassword) {
         setNewPassword(value);
      }
   };

   return (
      <form className={`${className}-form`}>
         {user && name && (
            <div className={`${className}-form__container`}>
               <div className={`${className}-form__container--group`}>
                  <label htmlFor='firstName' className={`${className}-form__label`}>
                     Your First Name
                  </label>
                  <input
                     id='firstName'
                     type='text'
                     name='firstName'
                     className={`${className}-form__input`}
                     onChange={handleInputChange}
                     value={isLoggedIn ? user.firstName : ''}
                     placeholder='Adam'
                  />
               </div>
               <div className={`${className}-form__container--group`}>
                  <label htmlFor='lastName' className={`${className}-form__label`}>
                     Your Last Name
                  </label>
                  <input
                     id='lastName'
                     type='text'
                     name='lastName'
                     className={`${className}-form__input`}
                     onChange={handleInputChange}
                     value={isLoggedIn ? user.lastName : ''}
                     placeholder='Smith'
                  />
               </div>
            </div>
         )}
         {user && email && (
            <div className={`${className}-form__group`}>
               <label htmlFor='email' className={`${className}-form__label`}>
                  Your Email
               </label>
               <input
                  id='email'
                  type='text'
                  name='email'
                  className={`${className}-form__input`}
                  onChange={handleInputChange}
                  value={isLoggedIn ? user.email : ''}
                  placeholder='eg. test@test.com'
               />
            </div>
         )}
         {user && password && (
            <div className={`${className}-form__group`}>
               <label htmlFor='password' className={`${className}-form__label`}>
                  Your Password
               </label>
               <input
                  id='password'
                  type='password'
                  name='password'
                  className={`${className}-form__input`}
                  onChange={handleInputChange}
                  placeholder='************'
               />
            </div>
         )}
         {user && newPassword && (
            <div className={`${className}-form__group`}>
               <label htmlFor='newPassword' className={`${className}-form__label`}>
                  New Password
               </label>
               <input
                  id='newPassword'
                  type='password'
                  name='newPassword'
                  className={`${className}-form__input`}
                  onChange={handleInputChange}
                  placeholder='************'
               />
            </div>
         )}
         {user && passwordConfirm && (
            <div className={`${className}-form__group`}>
               <label htmlFor='passwordAgain' className={`${className}-form__label`}>
                  Password Again
               </label>
               <input
                  id='passwordAgain'
                  type='password'
                  name='passwordAgain'
                  className={`${className}-form__input`}
                  onChange={handleInputChange}
                  placeholder='************'
               />
            </div>
         )}
         {user && photo && (
            <div className={`${className}-form__group`}>
               <label htmlFor='photo' className={`${className}-form__label`}>
                  Select a photo
               </label>
               <input
                  id='photo'
                  type='file'
                  name='photo'
                  className={`${className}-form__input`}
                  onChange={handleInputChange}
               />
            </div>
         )}

         {links && (
            <div className='login-form__links'>
               <Link className='login-form__forgot' to='/' onClick={handleForgotPassword}>
                  Forgot your password?
               </Link>
               <Link className='login-form__forgot' to='/signup'>
                  Or don't have an account yet?
               </Link>
            </div>
         )}
         <div className={`${className}-form__buttons`}>{children}</div>
      </form>
   );
}
